module UsuariosHelper
	def numero_dia(dia)
		data_inicio = dia.usuario.get_data_inicio()
		(dia.data - data_inicio).to_i
	end

  def foto_dia_anterior(dia)
    dia_anterior = Dia.where("data = ? AND usuario_id = ?", dia.data - 1, dia.usuario).first
    if dia_anterior == nil 
      return ""
    end

    return dia_anterior.foto
  end
end
