require 'json'
require "open-uri"

class Recipe < ApplicationRecord
  has_many :recipe_ingredients
  has_many :steps, dependent: :destroy
  has_many :dailies, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many :ingredients, through: :recipe_ingredients
  # Les deux ligne ci-dessous permettent de lier la recette traditionnelle avec la recette végétale
  has_one :vegatal_recipe, class_name: "Recipe", foreign_key: "traditionnal_id"
  belongs_to :traditionnal_recipe, class_name: "Recipe", optional: true
  has_one_attached :photo

  # Recherche ingréditens et/ou recette
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

  def new_photo_gpt
    client = OpenAI::Client.new
    response = client.images.generate(
      parameters: {
        prompt: "Can you find a beautiful popular instagram or pinterest image of the vegetarian recipe of #{name} with the ingredients mentionned in #{self.ingredients.pluck(:name).join(',')}",
        size: "256x256",
      }
    )

    # "Can you find or produce a realistic and colored image of the vegetarian recipe of #{name} beautiful enough for instagram with the ingredients mentionned in #{self.ingredients.pluck(:name).join(',')}"
    url = response["data"][0]["url"]
    file = URI.parse(url).open

    photo.purge if photo.attached?
    photo.attach(io: file, filename: "image of #{name}.jpg", content_type: "image/png")
    return photo
  end

  def sum_total_co2
    return if ingredients.blank?

    @calcul = 0
    ingredients.map do |ingredient|
      ingredient.co2_gr = 0.04 if ingredient.co2_gr.nil?
      co2 = ingredient.co2_gr
      recipe_ingredients.each do |recipeingredient|
        @calcul += co2*recipeingredient.quantity
      end
    end
    update(co2: @calcul)
  end
end
