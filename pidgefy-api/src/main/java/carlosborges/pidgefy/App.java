package carlosborges.pidgefy;

import carlosborges.pidgefy.auth.AuthController;
import carlosborges.pidgefy.common.CorsFilter;
import carlosborges.pidgefy.common.ErrorMessage;
import carlosborges.pidgefy.common.HttpException;
import carlosborges.pidgefy.pokemon.PokemonController;
import com.google.gson.FieldNamingPolicy;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.pokegoapi.exceptions.LoginFailedException;
import com.pokegoapi.exceptions.RemoteServerException;
import org.eclipse.jetty.http.HttpStatus;
import spark.Route;

import javax.servlet.http.HttpServletResponse;

import static spark.Spark.*;

public class App
{
    private static final Integer kDefaultPort = 8080;

    private Gson gson;

    public static void main( String[] args ) throws LoginFailedException, RemoteServerException {
        App app = new App();
        app.start(System.getenv("PORT"));
    }

    private void start(String port) {

        prepareServer(port);

        prepareResponseHandlers();

        prepareFilters();

        prepareApiRoutes();

        prepareGeneric404Handler();

        prepareGenericExceptionHandler();

        preparePokemonGoExceptions();

        awaitInitialization();

    }

    private void prepareFilters() {
        CorsFilter corsFilter = new CorsFilter();
        before(corsFilter::filter);
        options ("*", (req, res) -> "");
    }

    private void prepareServer(String portStr) {
        Integer port;

        if (portStr == null || portStr.isEmpty()) {
            port = kDefaultPort;
        } else {
            port = Integer.parseInt(portStr);
        }

        port(port);
    }

    private void prepareResponseHandlers() {
        gson = new GsonBuilder()
            .setFieldNamingPolicy(FieldNamingPolicy.LOWER_CASE_WITH_UNDERSCORES)
            .create();
    }

    private void prepareApiRoutes() {
        AuthController authController = new AuthController();
        get     ("/authorization-url", authController::authorizationUrl);
        post    ("/authorize", authController::authorize);
        get     ("/is-authenticated", authController::isAuthenticated);

        PokemonController pokemonController = new PokemonController(gson);
        get     ("/pokemons", pokemonController::get);
    }

    private void preparePokemonGoExceptions() {
        exception(LoginFailedException.class, (e, req, res) -> {
            int status = HttpStatus.UNAUTHORIZED_401;
            res.status(status);

            ErrorMessage error = new ErrorMessage(status, "Token inválido / inexistente");
            res.type("application/json");
            res.body(gson.toJson(error, ErrorMessage.class));
        });

        exception(RemoteServerException.class, (e, req, res) -> {
            int status = HttpStatus.BAD_GATEWAY_502;
            res.status(status);

            ErrorMessage error = new ErrorMessage(status, "Não foi possível comunicar com servidores de autorização");
            res.type("application/json");
            res.body(gson.toJson(error, ErrorMessage.class));
        });
    }

    private void prepareGeneric404Handler() {
        ErrorMessage error = new ErrorMessage(HttpStatus.NOT_FOUND_404, "Not Found");
        Route resposta = (req, res) -> {
            res.type("application/json");
            res.status(HttpStatus.NOT_FOUND_404);
            return gson.toJson(error, ErrorMessage.class);
        };

        get     ("*", resposta);
        post    ("*", resposta);
        put     ("*", resposta);
        patch   ("*", resposta);
        delete  ("*", resposta);
        head    ("*", resposta);
        trace   ("*", resposta);
        connect ("*", resposta);
    }

    private void prepareGenericExceptionHandler() {
        exception(Exception.class, (e, req, res) -> {
            e.printStackTrace();

            int code = HttpStatus.INTERNAL_SERVER_ERROR_500;
            res.status(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);

            ErrorMessage error = new ErrorMessage(code, "Internal Server Error");
            res.type("application/json");
            res.body(gson.toJson(error, ErrorMessage.class));
        });

        exception(HttpException.class, (e, req, res) -> {
            e.printStackTrace();

            HttpException httpE = (HttpException) e;

            res.status(httpE.status);

            ErrorMessage error = new ErrorMessage(httpE.status, httpE.message);
            res.type("application/json");
            res.body(gson.toJson(error, ErrorMessage.class));
        });
    }
}
