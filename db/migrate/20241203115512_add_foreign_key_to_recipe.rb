class AddForeignKeyToRecipe < ActiveRecord::Migration[7.1]
  def change
    add_belongs_to :recipes, :traditionnal_recipe, foreign_key: { to_table: :recipes }
  end
end
