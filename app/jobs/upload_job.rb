class UploadJob < ApplicationJob
  queue_as :default

  def perform(params = {})
    @recipe = GenerateRecipeGpt.new(params).call
  end
end
