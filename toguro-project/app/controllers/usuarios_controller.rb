class UsuariosController < ApplicationController
  before_filter :authenticate, :only => [:index]

  # POST /foto
  # TODO: Esse método pode ficar mais lógico se o id do dia vier na url, por exemplo
  # POST /foto/:id
  def foto
    require 'base64'
    require 'json'
    ajax_params = JSON.parse(params[:ajax_params])
    dia = Dia.find(ajax_params["wprm-dia"])

    foto_pathname = Rails.root.join('public', 'system', "dia_#{dia.id}.png")
    header, data = params[:foto].split(',')
    File.open(foto_pathname, 'wb') do |file|
      file.write(Base64.decode64(data))
    end

    dia.foto = '/system/' + foto_pathname.basename.to_s
    dia.save!
    render :inline => dia.foto
  end

  # GET /usuarios
  # GET /usuarios.json
  def index
    @usuarios = Usuario.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @usuarios }
    end
  end

  # GET /usuarios/1
  # GET /usuarios/1.json
  def show
    @usuario = Usuario.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @usuario }
    end
  end

  # GET /usuarios/new
  # GET /usuarios/new.json
  def new
    @usuario = Usuario.new
    @data_inicio = I18n.l Date.today

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @usuario }
    end
  end

  # GET /usuarios/1/edit
  def edit
    @usuario = Usuario.find(params[:id])
    @data_inicio = @usuario.get_data_inicio()
  end

  # POST /usuarios
  # POST /usuarios.json
  def create
    @usuario = Usuario.new(params[:usuario])

    all_saved = false
    respond_to do |format|
      begin 
        @usuario.transaction do
          @usuario.save!
          @usuario.create_dias_usuario(params[:data_inicio])
        end
        all_saved = true
      rescue ActiveRecord::StatementInvalid
        all_saved = false
      end

      if all_saved
        format.html { redirect_to @usuario, notice: 'Usuario was successfully created.' }
        format.json { render json: @usuario, status: :created, location: @usuario }
      else
        format.html { render action: "new" }
        format.json { render json: @usuario.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /usuarios/1
  # PUT /usuarios/1.json
  def update
    @usuario = Usuario.find(params[:id])

    respond_to do |format|
      begin
        @usuario.transaction do
          @usuario.update_attributes(params[:usuario])
          @usuario.update_dias_usuario(params[:data_inicio])
        end
        all_saved = true
      rescue ActiveRecord::StatementInvalid
        all_save = false
      end

      if all_saved
        format.html { redirect_to @usuario, notice: 'Usuario was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @usuario.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /usuarios/1
  # DELETE /usuarios/1.json
  def destroy
    @usuario = Usuario.find(params[:id])
    @usuario.destroy

    respond_to do |format|
      format.html { redirect_to usuarios_url }
      format.json { head :no_content }
    end
  end
end
