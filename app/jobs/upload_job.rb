class UploadJob < ApplicationJob
  include Rails.application.routes.url_helpers
  queue_as :default

  def perform(params = {})
    @recipe = GenerateRecipeGpt.new(params).call
    Turbo::StreamsChannel.broadcast_replace_to "recipe_#{@recipe.id}_recipe",
    target: "recipe-#{@recipe.id}",
    partial: "shared/redirect",
    locals: { path: recipe_path(@recipe), recipe: @recipe }
  end
end
