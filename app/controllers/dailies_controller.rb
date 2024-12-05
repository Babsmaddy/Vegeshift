class DailiesController < ApplicationController
  def create
    @recipe = Recipe.find(params[:recipe_id])
    @daily = Daily.new(daily_params)
    @daily.user = current_user
    @daily.recipe = @recipe
    if @daily.save
      redirect_to dashboards_path
      # respond_to do |format|
      #   format.html { redirect_to dashboards_path, notice: "Daily créé avec succès !" }
      #   format.turbo_stream do
      #     render turbo_stream: turbo_stream.append(
      #       "alerts",
      #       partial: "shared/alert",
      #       locals: { message: "Votre recette a été ajoutée à votre semaine !" }
      #     )
      #   end
      # end
    else
      render :new, status: :unprocessable_entity
    end
  end

  def destroy
    @daily = Daily.find(params[:id])
    @daily.destroy
    redirect_to dashboards_path, status: :see_other
  end


  private

    def daily_params
      params.require(:daily).permit(:date)
    end
end
