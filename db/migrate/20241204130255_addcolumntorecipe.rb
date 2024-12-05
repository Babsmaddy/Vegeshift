class Addcolumntorecipe < ActiveRecord::Migration[7.1]
  def change
    add_column :recipes, :co2_traditional, :integer, default: 0
  end
end
