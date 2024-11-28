class DailiesController < ApplicationController
  def create
    @recipe = Recipe.find(params[:recipe_id])
    @daily = Daily.new(daily_params)
    @daily.user = current_user
    @daily.recipe = @recipe
    if @daily.save
      redirect_to recipes_path
    end
  end
    private

    def daily_params
      params.require(:daily).permit(:date)
    end

end
