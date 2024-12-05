class GenerateRecipeGpt
  include Rails.application.routes.url_helpers

  def initialize(params = {})
    @photo = params[:photo] || nil
    @text = params[:text] || nil
    @client = OpenAI::Client.new
    @recipe = params[:recipe]
    @current_user = params[:current_user]
    @favorite = @current_user.favorites.find_by(recipe: @recipe)
    @daily = Daily.new
  end

  def call
    photo_gpt(@photo) unless @photo.nil?
    call_gpt(@text) unless @text.nil?
  end

  private

  def photo_gpt(upload)
    text = "
    Je veux que tu prennes le nom de cette recette et que tu me la retourne en version végétale avec ce format :
      { name: nom de la recette végétalisé, time: .., difficulty: (entre 1 et 3), cost: (entre 1 et 3), vegetal: true, co2: 0, co2_traditional: estime le cout en co2 en gramme de la recette traditionnel, ingredients: [{ name: nom de l'ingrédient, quantity: quantité en gramme }, { ... }],
      steps: [{ number: numéro de l'étape, content: contenu de l'étape }, { ... }] }
      Je souhaiterais au moins 4 ingrédients et au moins 5 étapes.
    S'il te plait, donne moi uniquement le JSON prêt à être parser dans une méthode de classe Ruby. Enlève le ```json au début de ta réponse et rien d'autre comme 'voici la recette ..'. Je compte sur toi.
    Merci
    "
    messages = [
      { type: "text", text: text},
      { type: "image_url",
        image_url: {
          url: "data:image/jpeg;base64,#{upload}"
          } }
        ]
        response = @client.chat(
          parameters: {
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: messages }],
            temperature: 0.1,
            max_tokens: 800
          }
        )
        set_recipe(JSON.parse(response["choices"][0]["message"]["content"].lstrip))
  end

  def call_gpt(upload)
    chatgpt_response = @client.chat(parameters: {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content:
          "
          Voici un paramètre : #{upload}
          avec ce paramètre je veux que tu prennes le nom de cette recette et que tu me la retourne en version végétale avec ce format :
          { name: nom de la recette végétalisé, time: .., difficulty: (entre 1 et 3), cost: (entre 1 et 3), vegetal: true, co2: 0, co2_traditional: estime le cout en co2 en gramme de la recette traditionnel, ingredients: [{ name: nom de l'ingrédient, quantity: quantité en gramme }, { ... }],
              steps: [{ number: numéro de l'étape, content: contenu de l'étape }, { ... }] }
          S'il te plait, donne moi uniquement le JSON prêt à être parser dans une méthode de classe Ruby. Enlève le ```json au début de ta réponse et rien d'autre comme 'voici la recette ..'. Je compte sur toi.
          Merci
          "
          }]
    })
    set_recipe(JSON.parse(chatgpt_response["choices"][0]["message"]["content"].lstrip))
  end

  def set_recipe(gpt)
    @recipe.update(
      name: gpt["name"],
      time: gpt["time"],
      difficulty: gpt["difficulty"],
      cost: gpt["cost"],
      co2_traditional: gpt["co2_traditional"],
      vegetal: true,
    )

    gpt["steps"].each do |step|
      Step.create!(
        number: step["number"],
        content: step["content"],
        recipe: @recipe
      )
    end

    gpt["ingredients"].each do |ingredient|
      ingredient_new = Ingredient.where("name ILIKE ?", ingredient["name"]).first_or_create!(name: ingredient["name"])
      RecipeIngredient.create!(
        ingredient: ingredient_new,
        quantity: ingredient["quantity"],
        recipe: @recipe
      )
    end
    @recipe.sum_total_co2
    new_photo_gpt
    Turbo::StreamsChannel.broadcast_replace_to "recipe_#{@recipe.id}_recipe",
    target: "recipe-#{@recipe.id}",
    partial: "recipes/recipe",
    locals: { path: recipe_path(@recipe), recipe: @recipe, favorite: @favorite, daily: @daily }
  end

  def new_photo_gpt
    response = @client.images.generate(
      parameters: {
        # prompt: "Je souhaiterai une image de ce plat #{@recipe.name} qui est un plate végétale. Je ne veux donc pas d'image avec de la viande. Voici la liste d'ingrédients si tu veux pour t'inspirer dans ta création #{@recipe.ingredients.pluck(:name).join(',')}. Cette photo sera destinée à être vue par mes followers sur instagram qui sont habitué à voir des close-up vue de haut de mes plats. J'utilise des filtres à la mode pour un effet réaliste mais qui donne envie d'être dégusté. Je veux uniquement la photo du plat dans une assiette cuisinée, prêt à être servi.",
        prompt: "Peux tu trouver une belle photo de cette recette végétarienne de #{@recipe.name}  qui est populaire sur les réseaux sociaux contenant les ingrédients mentionnés dans #{@recipe.ingredients.pluck(:name).join(',')}",
        size: "256x256",
      }
    )

    # "Can you find or produce a realistic and colored image of the vegetarian recipe of #{name} beautiful enough for instagram with the ingredients mentionned in #{self.ingredients.pluck(:name).join(',')}"
    url = response["data"][0]["url"]
    file = URI.parse(url).open

    @recipe.photo.purge if @recipe.photo.attached?
    @recipe.photo.attach(io: file, filename: "image of #{@recipe.name}.jpg", content_type: "image/png")
  end
end
