class CreateTicks < ActiveRecord::Migration
  def change
    create_table :ticks do |t|
      t.integer    :intValue
      
      t.timestamps
    end
  end
end