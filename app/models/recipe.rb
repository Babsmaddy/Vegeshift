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
