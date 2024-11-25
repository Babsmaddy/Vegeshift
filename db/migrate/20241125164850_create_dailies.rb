class CreateDailies < ActiveRecord::Migration[7.1]
  def change
    create_table :dailies do |t|
      t.date :date
      t.references :recipe, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
