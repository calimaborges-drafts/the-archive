class Usuario < ActiveRecord::Base
  has_many :dias, :dependent => :destroy
  attr_accessible :email, :password

  def get_data_inicio
  	self.dias.minimum(:data)
  end

  def self.authenticate(email, password)
    Usuario.where("email = ? AND password = ?", email, password).first
  end

  def create_dias_usuario(data_inicio)
    data_inicio = data_inicio.to_date - 1
    for i in 0..28
      self.dias.create(data: data_inicio + i, 
        fez_dieta: false, 
        fez_exercicio: false, 
        fez_suplementacao: false, 
        foto: nil)
    end
    true
  end

  def update_dias_usuario(data_inicio)
    data_inicio = data_inicio.to_date - 1
    dias = self.dias.order("data ASC")

    if (dias.length < 1) 
      self.create_dias_usuarios(data_inicio + 1)
      return true
    end
    
    diferenca = data_inicio - dias[0].data
    return true if (diferenca == 0)

    dias.each do |dia|
      dia.data = dia.data + diferenca
      dia.save!
    end
    return true
  end
end
