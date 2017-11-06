class Dia < ActiveRecord::Base
  belongs_to :usuario
  attr_accessible :data, :fez_dieta, :fez_exercicio, :fez_suplementacao, :foto
end
