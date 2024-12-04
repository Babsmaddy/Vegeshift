class DashboardsController < ApplicationController
  def index
    @dailies = current_user.dailies
    @favorites = current_user.favorites
  end

  def create
    @daily = Daily.new
  end

  def list
    @dailies = current_user.dailies
  end

  def charts
    @dailies = current_user.dailies
    @calcul = 0
    # @dailies.each do |daily|
    #   daily.recipe.vegetal? ? @calcul += daily.recipe.co2 : trad = daily.recipe
    #   if trad.traditionnal_recipe_id.nil?
    #     trad.traditionnal_recipe_id.co2 = 1000
    #   end
    #   vege.co2 = 150 if vege.co2.nil?
    #   @calcul = vege.co2 - trad.traditionnal_recipe.co2
    #   raise
    # end
  end
end
