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
    @yesterday = @dailies.where(date: (Date.today - 1)..Date.today)
    @week = @dailies.where(date: (Date.today - 7)..Date.today)
    @month = @dailies.where(date: (Date.today - 31)..Date.today)
    @three = @dailies.where(date: (Date.today - 93)..Date.today)
    @six = @dailies.where(date: (Date.today - 182)..Date.today)
    @year = @dailies.where(date: (Date.today - 365)..Date.today)

    @beginning = calcul_co2_dailies(@dailies)
    @yesterday_co2 = calcul_co2_dailies(@yesterday)
    @week_co2 = calcul_co2_dailies(@week)
    @month_co2 = calcul_co2_dailies(@month)
    @three_co2 = calcul_co2_dailies(@three)
    @six_co2 = calcul_co2_dailies(@six)
    @year_co2 = calcul_co2_dailies(@year)
  end

  private

  def calcul_co2_dailies(dailies)
    calcul = 0
    dailies.each do |daily|
     calcul += (1750 - daily.recipe.co2)
    end
    calcul
  end
end
