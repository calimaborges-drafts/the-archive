require 'active_record'
require 'logger'

module Database
  def self.connect()
    dbconfig = YAML::load(File.open(File.join(File.dirname(__FILE__), '..', 'config', 'database.yml')))
    ActiveRecord::Base.establish_connection(dbconfig)
    ActiveRecord::Base.logger = Logger.new(File.open(File.join(File.dirname(__FILE__), '..', 'db', 'database.log'), 'a'))
  end
end