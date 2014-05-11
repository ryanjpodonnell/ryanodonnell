class CreateSnakeScores < ActiveRecord::Migration
  def change
    create_table :snake_scores do |t|
      t.string :initials
      t.integer :score

      t.timestamps
    end
  end
end
