class AddColumnCo2Gr < ActiveRecord::Migration[7.1]
  def change
    add_column :ingredients, :co2_gr, :float
    change_column :ingredients, :co2, :float
    rename_column :ingredients, :co2, :co2_kg
  end
end
