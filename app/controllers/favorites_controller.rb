class FavoritesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    @recipe = Recipe.find(params[:recipe_id])
    @favorite = Favorite.new(user: current_user, recipe: @recipe)
    @favorite.save
  end

  def destroy
    @recipe = Recipe.find(params[:recipe_id])
    @favorite = Favorite.find(params[:id])
    @favorite.destroy
  end
end
