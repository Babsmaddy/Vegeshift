class DashboardsController < ApplicationController
  def index
    @clothes = Clothe.all
    @user = current_user
    @clothe = Clothe.new
    @rentals = Rental.all
    @rentals = @rentals.where("start_date <= ? AND end_date >= ? AND user_id = ?", Date.today, Date.today, current_user.id)
    @total_rented = @user.rentals.map do |rental|
      rental.clothe[:price]
    end
    @item_rented = @user.rentals.map do |rental|
      rental.clothe
    end
    @my_rentals = @rentals.where("user_id = ?", current_user.id).map do |rental|
      rental.clothe
    end
  end
  end
end
