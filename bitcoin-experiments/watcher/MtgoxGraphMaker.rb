require 'active_record'
require File.join(File.dirname(__FILE__), 'helpers', 'DatabaseHelper')
require File.join(File.dirname(__FILE__), 'model', 'tick')
require 'gruff'

class MtGoxGraphMaker
  def initialize
    Database.connect()
  end

  def generateGraph(data)
    
  end

  def graph(width=1000)
    graph = Gruff::Line.new(width) # the width of the resulting image
    graph.title = "MtGox"
    # graph.theme_odeo # available: theme_rails_keynote, theme_37signals, theme_odeo, or custom (fragile)
    graph.theme = {
      :colors => ['#3B5998'],
      :marker_color => 'silver',
      :font_color => '#333333',
      :background_colors => ['white', 'silver']
    }
    ticks = Tick.all
    data = []
    ticks.collect do |tick|
      xy = {}
      xy[:y] = tick.intValue
      xy[:x] = tick.created_at
      data << xy
    end
    p data
    graph.data("data", data.map { |y| y[:y]/10000 })
    graph.labels = Hash[data.map { |x| x[:x] }]
    graph.write("grafico.png")
  end
end

gMaker = MtGoxGraphMaker.new
gMaker.graph()