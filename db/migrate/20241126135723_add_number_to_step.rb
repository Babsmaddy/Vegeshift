class AddNumberToStep < ActiveRecord::Migration[7.1]
  def change
    add_column :steps, :number, :integer
    remove_column :recipes, :step, :text
  end
end
