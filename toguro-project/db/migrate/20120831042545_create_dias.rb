class CreateDias < ActiveRecord::Migration
  def change
    create_table :dias do |t|
      t.string :foto
      t.boolean :fez_exercicio
      t.boolean :fez_dieta
      t.boolean :fez_suplementacao
      t.datetime :data
      t.references :usuario

      t.timestamps
    end
    add_index :dias, :usuario_id
  end
end
