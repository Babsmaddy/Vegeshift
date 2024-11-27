class Ingredient < ApplicationRecord
  has_many :recipes, through: :recipe_ingredient
end
