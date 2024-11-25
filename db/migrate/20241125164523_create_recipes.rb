class CreateRecipes < ActiveRecord::Migration[7.1]
  def change
    create_table :recipes do |t|
      t.string :name
      t.text :step
      t.integer :time
      t.integer :difficulty
      t.integer :cost
      t.integer :co2
      t.boolean :vegetal, default: false

      t.timestamps
    end
  end
end
