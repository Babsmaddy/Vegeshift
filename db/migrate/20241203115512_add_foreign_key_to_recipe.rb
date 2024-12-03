class AddForeignKeyToRecipe < ActiveRecord::Migration[7.1]
  def change
    add_foreign_key :recipe, :traditionnal_recipe, foreign_key: { to_table: :recipe }
  end
end
