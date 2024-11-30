class DashboardsController < ApplicationController
  def index
    @dailies = Daily.all
    @favorites = Favorite.all
  end
end
