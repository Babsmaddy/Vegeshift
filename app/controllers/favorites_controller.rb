class FavoritesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    @recipe = Recipe.find_by(id: params[:recipe_id])
    @favorite = Favorite.new(user: current_user, recipe: @recipe)

    if @favorite.save
      redirect_to recipe_path(@recipe)
    end
  end

  def destroy
    @recipe = Recipe.find_by(id: params[:recipe_id])
    @favorite = Favorite.find_by(id: params[:id])
    if @favorite.destroy
      redirect_to recipe_path(@recipe), status: :ok
    end
  end
end
