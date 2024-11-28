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
    # vérifier si c'est .present?
    # params[:temp_photo].attached?
    # raise
    @gpt_response = Recipe.call_gpt(encode_image) if params[:temp_photo].present?
    @gpt_response = Recipe.call_gpt(params[:url]) if params[:url].present?
    @gpt_response = Recipe.call_gpt(params[:title]) if params[:title].present?


    @recipe = Recipe.set_recipe(@gpt_response)
    if @recipe.save
      redirect_to recipe_path(@recipe)
    else
      render :new, status: :unprocessable_entity

    end
  end

  private

  def encode_image
    file_content = File.read(params[:temp_photo].tempfile)
    Base64.strict_encode64(file_content)
  end
end
