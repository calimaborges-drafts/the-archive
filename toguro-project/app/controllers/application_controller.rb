class ApplicationController < ActionController::Base
  protect_from_forgery

  protected
    def authenticate
      if @usuario_logado = authenticate_with_http_basic do |u, p|
          Usuario.authenticate(u, p)
        end
      else
        request_http_basic_authentication
      end
    end
end
