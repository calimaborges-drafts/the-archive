# encoding:utf-8

require 'nokogiri'
require 'uri'
require 'open-uri'

require File.join(File.dirname(__FILE__), '..', 'model/concurso')


##
# CORE LOGIC
##

class PciParser
  attr_accessor :concursos

  HOST = 'http://www.pciconcursos.com.br/'
  ADDRESS = HOST + 'concursos/';

  def parse()
    @concursos = Array.new()
    @url = URI.encode(ADDRESS)
    puts "Looking for #{@url} ..."
    @doc = Nokogiri::HTML(open(@url))
    @doc.css(".listageral tr").each do |table|
      next if table.attr('class') == 'ua'

      concurso = Concurso.new

      tds = table.css("td")
      preencherNomeComTd(tds[0], concurso)
      preencherEstadoComTd(tds[1], concurso)
      preencherVagasESalarioComTd(tds[2], concurso)
      preencherCargoENivelComTd(tds[2], concurso)
      preencherDataFinalInscricaoComTd(tds[3], concurso)
      @concursos << concurso
    end
  end

  def preencherNomeComTd(td, concurso)
    td.css("a").each do |a|
      concurso.nome = a.text
      concurso.codigo = a.attr('href')
      break
    end
  end

  def preencherEstadoComTd(td, concurso)
    concurso.estado = td.text
  end

  def preencherVagasESalarioComTd(td, concurso)
    results = td.text.scan(/(\d*)\s*vagas*[^R$]*[R\$]*\s*([\d\.,]*)/i)

    if results.empty?
      puts 'Resultado vazio vagas e valor salario: ' + td.to_s
      return nil
    end

    groups = results[0]
    concurso.vagas = groups[0]
    concurso.salarioMaximo = groups[1]
  end
end

def preencherCargoENivelComTd(td, concurso)
  spans = td.css("span")
  results = spans[0].to_s.scan(/^[^>]*>([^<]*)/)

  if (results.empty?)
    puts 'Resultado vazio cargo e nivel: ' + td.to_s
    return nil
  end

  concurso.cargo = results[0][0]
  concurso.nivel = spans[0].css("span")[0].text
end

def preencherDataFinalInscricaoComTd(td, concurso)
  results = td.text.scan(/(\d\d\/\d\d\/\d+)/)

  if results.empty?
    if td.text =~ /suspenso/i
       concurso.isSuspenso = true
    else
      # todo: Verificar se está suspenso ou possui vários períodos
      puts 'Resultado vazio data final inscricao: ' + td.to_s
    end
    
    return nil
  end

  concurso.dataFinalInscricao = results[0][0]
end
