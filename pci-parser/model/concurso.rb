# encoding:utf-8
require 'active_record'

class Concurso < ActiveRecord::Base
  attr_accessible :codigo, 
  :nome, 
  :vagas, 
  :salarioMaximo, 
  :cargo, 
  :nivel, 
  :estado, 
  :dataFinalInscricao, 
  :isSuspenso

  validates :codigo,  :presence => true, :uniqueness => true
end