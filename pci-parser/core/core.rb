require 'active_record'
require 'yaml'
require 'logger'

require File.join(File.dirname(__FILE__), '..', 'helpers', 'database_helper')
require File.join(File.dirname(__FILE__), '.', 'parser')
require File.join(File.dirname(__FILE__), '..', 'model', 'concurso')

class Core
  def initialize()
    Database.connect()
    @parser = PciParser.new
  end
    
  def parse()
    @parser.parse()
  end
  
  def logic()
    @parser.concursos.each do |concurso|
      if not concurso.save
        concurso.errors.each do |error|
          # fazer logica de diff e verificar se houve modificação em alguma coisa
          puts error
        end
      end
    end
# Logica abaixo deverá ser movida para o get do Rails.
# Já rola de criar a aplicação em Rails mesmo para obter os JSONs
    concursos = Concurso.find(:all, :conditions => ["created_at < ?", 120.seconds.ago] )
    puts concursos
  end
end