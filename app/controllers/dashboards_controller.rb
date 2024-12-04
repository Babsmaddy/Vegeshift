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
    @dailies.each do |daily|
      @calcul = daily.recipe.co2 - daily.recipe.co2_traditional
    end
  end
end
