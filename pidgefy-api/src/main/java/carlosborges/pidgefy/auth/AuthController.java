package carlosborges.pidgefy.auth;

import carlosborges.pidgefy.common.HttpException;
import carlosborges.pidgefy.misc.Factory;
import com.pokegoapi.auth.GoogleUserCredentialProvider;
import com.pokegoapi.exceptions.LoginFailedException;
import com.pokegoapi.exceptions.RemoteServerException;
import okhttp3.OkHttpClient;
import org.eclipse.jetty.http.HttpStatus;
import spark.Request;
import spark.Response;

public class AuthController {

    public String authorizationUrl(Request req, Response res) {
        return GoogleUserCredentialProvider.LOGIN_URL;
    }

    public String authorize(Request req, Response res) throws HttpException, LoginFailedException, RemoteServerException {
        String token = req.queryParams("token");

        if (token == null) {
            throw new HttpException(HttpStatus.BAD_REQUEST_400, "Token não informado");
        }

        OkHttpClient http = new OkHttpClient();
        GoogleUserCredentialProvider provider = new GoogleUserCredentialProvider(http);
        provider.login(token);

        if (provider.getRefreshToken() == null) {
            throw new HttpException(HttpStatus.UNAUTHORIZED_401, "Token informado não é válido");
        }

        return provider.getRefreshToken();
    }

    public String isAuthenticated(Request req, Response res) throws HttpException, LoginFailedException, RemoteServerException {
        Factory factory = new Factory(req, res);

        if (factory.token() == null) {
            throw new HttpException(HttpStatus.UNAUTHORIZED_401, "Token não informado");
        }

        factory.pokemonGo();

        return Boolean.TRUE.toString();
    }

}
