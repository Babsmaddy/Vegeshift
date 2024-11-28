class DailiesController < ApplicationController
  def create
    @recipe = Recipe.find(params[:recipe_id])
    @daily = current_user.favorites.new(recipe: recipe)
  end
end
