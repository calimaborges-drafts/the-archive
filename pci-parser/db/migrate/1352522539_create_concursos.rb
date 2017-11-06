class CreateConcursos < ActiveRecord::Migration
  def change
    create_table :concursos do |t|
      t.string    :codigo
      t.string    :nome
      t.integer   :vagas
      t.float     :salarioMaximo
      t.string    :cargo
      t.string    :nivel
      t.string    :estado
      t.date      :dataFinalInscricao
      t.boolean   :isSuspenso

      t.timestamps
    end
  end
end