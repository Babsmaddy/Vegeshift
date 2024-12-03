class RecipesController < ApplicationController
  def index
    @recipes = Recipe.where(vegetal: true)
    if params[:query].present?
      @recipes = @recipes.global_search(params[:query])
    end
  end

  def show
    @recipe = Recipe.find(params[:id])
    @daily = Daily.new
    # @daily = current_user.dailies.find_by(recipe: @recipe)
    @favorite = current_user.favorites.find_by(recipe: @recipe) || nil

    @calcul = 0
    @recipe.ingredients.map do |ingredient|
      @recipe.recipe_ingredients.each do |recipeingredient|
        if ingredient.co2_gr.nil?
          @calcul += 0.04*recipeingredient.quantity
        else
          @calcul += ingredient.co2_gr*recipeingredient.quantity
        end
      end
    end
  end

  def new
    @recipe = Recipe.new
  end

  def create
    # vérifier si c'est .present?
    # params[:temp_photo].attached?
    # raise
    # @gpt_response = Recipe.photo_gpt(encode_image) if params[:temp_photo].present?
    # @gpt_response = Recipe.call_gpt(params[:url]) if params[:url].present?
    # @gpt_response = Recipe.call_gpt(params[:title]) if params[:title].present?
    @recipe = Recipe.create

    UploadJob.perform_later(photo: encode_image, recipe: @recipe, current_user: current_user) if params[:temp_photo].present?
    UploadJob.perform_later(text: params[:url], recipe: @recipe, current_user: current_user) if params[:url].present?
    UploadJob.perform_later(text: params[:title], recipe: @recipe, current_user: current_user) if params[:title].present?

    redirect_to recipe_path(@recipe)

    # @recipe = Recipe.set_recipe(@gpt_response)
    # @recipe = Recipe.photo_gpt
    # if @recipe.save

    # else
    #   render :new, status: :unprocessable_entity
    # end
  end

  def loader

  end


  private

  def encode_image
    file_content = File.read(params[:temp_photo].tempfile)
    Base64.strict_encode64(file_content)
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

  def recipe_params
    params.require(:recipe).permit(:name, :difficulty, :ingredients, :time, :co2_kg, :co2_gr)
  end
end
