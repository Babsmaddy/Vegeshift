class Recipe < ApplicationRecord
  has_many :ingredients, through: :recipe_ingredient
end
