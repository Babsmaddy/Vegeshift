class RecipesController < ApplicationController
  def index
    @recipes = Recipe.all
  end

  def show
    @recipe = Recipe.find(params[:id])
    @daily = Daily.new
    @favorite = current_user.favorites.find_by(recipe: @recipe) || nil
  end

  def new
    @recipe = Recipe.new
  end

  def create
    # vérifier si c'est .present?
    @gpt_response = Recipe.content(encode_image) if params[:temp_photo].present?
    @gpt_response = Recipe.content(params[:url]) if params[:url].present?
    @gpt_response = Recipe.content(params[:title]) if params[:title].present?


    @recipe = Recipe.create_recipe

    if @recipe.save
      redirect_to recipes_path
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
