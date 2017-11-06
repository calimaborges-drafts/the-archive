require 'faye/websocket'
require 'eventmachine'
require 'json'
require 'pp'
require 'active_record'
require File.join(File.dirname(__FILE__), 'helpers', 'DatabaseHelper')
require File.join(File.dirname(__FILE__), 'model', 'tick')

class Channel
  def Channel.unsubscribe_message(channel)
    uuid = case channel
    when :trades
      "dbf1dee9-4f2e-4a08-8cb7-748919a71b21" # trades (each time a trade happens, you get something here)
    when :ticker
      "d5f06780-30a8-4a48-a2f8-7ed181b4a13f" # the mtgox ticker (lots of updates, with often the same data)
    when :depth
      "24e67e0d-1cad-4cc0-9e7a-f8523ef460fe" # depth information in realtime (price + amount + type... type=1=Ask, type=2=Bid)
    end
    {'op' => 'unsubscribe', 'channel' => uuid}.to_json
  end
end

class MtGoxMessageParser
  def MtGoxMessageParser.parseMessage(msg)
    jsonMsg = JSON.parse(msg)
    last_orig = jsonMsg['ticker']['last']['value_int']
    pp jsonMsg
    if (last_orig == nil) 
      pp jsonMsg
    else 
      pp last_orig
      intValue = Integer(last_orig)
      tick = Tick.new
      tick.intValue = intValue
      if not tick.save
        tick.errors.each do |error|
          # fazer logica de diff e verificar se houve modificação em alguma coisa
          puts error
        end
      end
    end  

    rescue Exception => e
      puts e.message
      pp jsonMsg
  end
end

EM.run {
  ws = Faye::WebSocket::Client.new('ws://websocket.mtgox.com/mtgox')

  ws.onopen = lambda do |event|
    p [:open]
    ws.send Channel.unsubscribe_message(:depth)
    ws.send Channel.unsubscribe_message(:trades)
    Database.connect();
  end

  ws.onmessage = lambda do |event|
    # p [:message, event.data]
    MtGoxMessageParser.parseMessage(event.data)
  end

  ws.onclose = lambda do |event|
    p [:closed]
    run_case = lambda do |n|
      ws = Faye::WebSocket::Client.new('ws://websocket.mtgox.com/mtgox')

      ws.onopen = lambda do |event|
        p [:open]
        ws.send Channel.unsubscribe_message(:depth)
        ws.send Channel.unsubscribe_message(:trades)
        Database.connect();
      end

      ws.onmessage = lambda do |event|
        # p [:message, event.data]
        MtGoxMessageParser.parseMessage(event.data)
      end

      ws.onclose = lambda do |event|
        p [:closed_again]
        sleep(5)
        run_case.call(n)
      end
    end
    run_case.call(1)
  end
}