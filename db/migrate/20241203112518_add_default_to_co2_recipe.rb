class AddDefaultToCo2Recipe < ActiveRecord::Migration[7.1]
  def change
    change_column_default :recipes, :co2, 0
  end
end
