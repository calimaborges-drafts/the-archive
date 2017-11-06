# encoding:utf-8
require 'active_record'

class Tick < ActiveRecord::Base
  attr_accessible :intValue
end