class Recipe < ApplicationRecord
  has_many :recipe_ingredients
  has_many :steps
  has_many :ingredients, through: :recipe_ingredients
  has_one_attached :photo


  private

  def content(upload)
    client = OpenAI::Client.new
      client.chat(parameters: {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content:
          # ce n'est pas exist masi je vais chercher après
          "
          Voici un paramètre : #{upload}
          avec ce paramètre je veux que tu prennes le nom de cette recette et que tu me la retourne en version végétale avec ce format :
          vege_recipe = [{ name: nom de la recette végétalisé, time: .., difficulty: (entre 1 et 3), cost: (entre 1 et 3), vegetal: true, co2: 0, ingredients: [{ name: nom de l'ingrédient, quantity: quantité en gramme }, { ... }],
              steps: [{ number: numéro de l'étape, content: contenu de l'étape }, { ... }] }]
          S'il te plait, donne moi uniquement l'array ci-dessus et rien d'autre comme 'voici la recette ..'. Je compte sur toi.
          Merci
          "
          }]
      })
      return JSON.parse(chatgpt_response["choices"][0]["message"]["content"])

  end

  def create_recipe(name, time, difficulty, cost, vegetal, co2, ingredients, steps)
    recipe = Recipe.create!(
      name: name,
      time: time,
      difficulty: difficulty,
      cost: cost,
      vegetal: vegetal,
      co2: co2
    )

    steps.each do |step|
      recipe.steps.create!(
        number: step[:number],
        content: step[:content]
      )
    end

    ingredients.each do |ingredient|
      ingredient_new = Ingredient.where("name ILIKE ?", ingredient[:name]).first_or_create!(name: ingredient[:name])
      recipe.recipe_ingredients.create!(
        ingredient: ingredient_new,
        quantity: ingredient[:quantity]
      )
    end
  end
end
