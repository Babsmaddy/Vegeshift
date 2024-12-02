require 'json'
require "open-uri"

class Recipe < ApplicationRecord
  has_many :recipe_ingredients
  has_many :steps, dependent: :destroy
  has_many :dailies, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many :ingredients, through: :recipe_ingredients
  has_one_attached :photo
  include PgSearch::Model


  pg_search_scope :global_search,
  against: [ :name ],
  associated_against: {
    ingredients: [ :name ]
  },
  using: {
    tsearch: { prefix: true }
  }

  after_create :new_photo_gpt

  def self.call_gpt(upload)
    client = OpenAI::Client.new
    chatgpt_response = client.chat(parameters: {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content:
          "
          Voici un paramètre : #{upload}
          avec ce paramètre je veux que tu prennes le nom de cette recette et que tu me la retourne en version végétale avec ce format :
          { name: nom de la recette végétalisé, time: .., difficulty: (entre 1 et 3), cost: (entre 1 et 3), vegetal: true, co2: 0, ingredients: [{ name: nom de l'ingrédient, quantity: quantité en gramme }, { ... }],
              steps: [{ number: numéro de l'étape, content: contenu de l'étape }, { ... }] }
          S'il te plait, donne moi uniquement le JSON prêt à être parser dans une méthode de classe Ruby. Enlève le ```json au début de ta réponse et rien d'autre comme 'voici la recette ..'. Je compte sur toi.
          Merci
          "
          }]
    })
      return JSON.parse(chatgpt_response["choices"][0]["message"]["content"].lstrip)
  end

  def self.photo_gpt(upload)
    client = OpenAI::Client.new
    text = "
    Je veux que tu prennes le nom de cette recette et que tu me la retourne en version végétale avec ce format :
    { name: nom de la recette végétalisé, time: .., difficulty: (entre 1 et 3), cost: (entre 1 et 3), vegetal: true, co2: 0, ingredients: [{ name: nom de l'ingrédient, quantity: quantité en gramme }, { ... }],
    steps: [{ number: numéro de l'étape, content: contenu de l'étape }, { ... }] }
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
        response = client.chat(
          parameters: {
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: messages }],
            temperature: 0.1,
            max_tokens: 800
          }
        )
        return JSON.parse(response["choices"][0]["message"]["content"].lstrip)
  end

  def self.set_recipe(gpt)
    @recipe = Recipe.create!(
      name: gpt["name"],
      time: gpt["time"],
      difficulty: gpt["difficulty"],
      cost: gpt["cost"],
      vegetal: true,
      co2: 0
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
    @recipe
  end

  def new_photo_gpt
    client = OpenAI::Client.new
    response = client.images.generate(
      parameters: {
        prompt: "A recipe image of #{name} with this ingredients #{self.ingredients.pluck(:name).join(',')}",
        size: "256x256",
      }
    )

    url = response["data"][0]["url"]
    file = URI.parse(url).open

    photo.purge if photo.attached?
    photo.attach(io: file, filename: "image of #{name}.jpg", content_type: "image/png")
    return photo
  end

  def sum_total_co2
    # self.ingredients.sum {|ingredient| ingredient.co2 || 100}
    return if ingredients.blank?

    total_co2 = ingredients.sum { |ingredient| ingredient.co2 || 100 }
    update(co2: total_co2)
  end
end
