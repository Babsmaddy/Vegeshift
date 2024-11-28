class Recipe < ApplicationRecord
  has_many :recipe_ingredients, dependent: :destroy
  has_many :steps, dependent: :destroy
  has_many :ingredients, through: :recipe_ingredients
  has_one_attached :photo
  
  def sum_total_co2
    # self.ingredients.sum {|ingredient| ingredient.co2 || 100}
    return if ingredients.blank?

    total_co2 = ingredients.sum { |ingredient| ingredient.co2 || 100 }
    update(co2: total_co2)
  end

end
