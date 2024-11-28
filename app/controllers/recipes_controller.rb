class RecipesController < ApplicationController
  def index
    @recipes = Recipe.all
  end

  def show
    @recipe = Recipe.find(params[:id])
    @daily = Daily.new
    # @daily = current_user.dailies.find_by(recipe: @recipe)
    @favorite = current_user.favorites.find_by(recipe: @recipe) || nil
  end

  def new
    @recipe = Recipe.new
  end

  def create

    @recipe = Recipe.new(recipe_params)
    if @recipe.save
      @recipe.sum_total_co2
      redirect_to recipes_path
    else
      render :new, status: :unprocessable_entity
    end
  end

  def update
    @recipe = Recipe.find(params[:id])

    if recipe.update(recipe_params)

      @recipe.sum_total_co2
      redirect_to recipes_path
    else
      render :edit, status: :unprocessable_entity
    end
  end

  private

  def recipe_params
    params.require(:recipe).permit(:name, :difficulty, :time, :co2)
  end
end
