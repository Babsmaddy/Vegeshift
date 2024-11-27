class FavoritesController < ApplicationController

  def create
    @recipe = Recipe.find(params[:recipe_id])
    #créer le favoris en l'associant à l'utilisateur
    @favorite = current_user.favorites.new(recipe: recipe)

    if favorite.save
      redirect_to recipe_path(@recipe)
    else
      render "", status: :unprocessable_entity
    end
  end
end
