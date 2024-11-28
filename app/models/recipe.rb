class Recipe < ApplicationRecord
  has_many :recipe_ingredients
  has_many :steps
  has_many :ingredients, through: :recipe_ingredients
  has_one_attached :photo


  private

  def content
    client = OpenAI::Client.new
      client.chat(parameters: {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content:
          "
          Voici le lien d'une recette :
            'https://www.marmiton.org/recettes/recette_boeuf-bourguignon_18889.aspx'
          avec ce lien je veux que tu prennes le nom de cette recette et que tu me la retourne en version végétale avec ce format :
          vege_recipe = [{ name: nom de la recette végétalisé, time: .., difficulty: (entre 1 et 3), cost: (entre 1 et 3), vegetal: true, co2: 0, ingredients: [{ name: nom de l'ingrédient, quantity: quantité en gramme }, { ... }],
              steps: [{ number: numéro de l'étape, content: contenu de l'étape }, { ... }] }]
          S'il te plait, donne moi uniquement l'array ci-dessus et rien d'autre comme 'voici la recette ..'. Je compte sur toi.
          Merci
          "
          }]
      })
      return chatgpt_response["choices"][0]["message"]["content"]
  end
end
