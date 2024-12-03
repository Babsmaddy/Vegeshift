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

end
