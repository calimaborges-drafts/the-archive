class ChangeDataInDia < ActiveRecord::Migration
  def up
    change_table :dias do |t|
      t.change :data, :date
    end
  end

  def down
    change_table :dias do |t|
      t.change :data, :datetime
    end
  end
end
