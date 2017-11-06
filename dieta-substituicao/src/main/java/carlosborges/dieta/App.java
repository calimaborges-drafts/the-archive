package carlosborges.dieta;

import carlosborges.dieta.commons.*;
import carlosborges.dieta.food.FoodController;
import carlosborges.dieta.food.FoodGroupController;
import com.google.common.net.MediaType;
import com.google.gson.FieldNamingPolicy;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.eclipse.jetty.http.HttpStatus;
import org.flywaydb.core.Flyway;
import org.sql2o.Sql2o;
import spark.ResponseTransformer;
import spark.Route;

import java.io.File;
import java.io.IOException;

import static spark.Spark.*;

public class App {

    private final transient String port;
    private final transient String jdbcUrl;
    private ResponseTransformer jsonTransformer;
    private RestPatternizer restPatternizer;
    private Sql2o sql2o;
    private Gson gson;
    private Cors cors;

    public App (String port, String databaseUrl) {
        this.port = port;
        this.jdbcUrl = databaseUrl;
    }


    public static void main( String[] args ) throws IOException {
        new Dotenv().load(new File(".env"));

        App app = new App(System.getProperty("PORT"), System.getProperty("JDBC_DATABASE_URL"));
        app.start();
    }

    public void start () {
        prepareServer();
        prepareDatabase();
        prepareCors();
        prepareRestHandlers();
        prepareRoutes();
        prepareGenericExceptionHandler();
        prepareGeneric404Handler();
    }

    private void prepareServer() {
        Integer port;

        if (this.port == null || this.port.isEmpty()) {
            throw new IllegalArgumentException("É obrigatório informar a porta de incialização do servidor.");
        } else {
            port = Integer.parseInt(this.port);
        }

        port(port);
    }

    private void prepareDatabase() {
        String jdbcUrl;

        if (this.jdbcUrl == null) {
            throw new IllegalArgumentException("É obrigatório informar a string de conexão para o banco de dados.");
        } else {
            jdbcUrl = this.jdbcUrl;
        }

        Flyway flyway = new Flyway();
        flyway.setDataSource(jdbcUrl, null, null);
        flyway.migrate();

        sql2o = new Sql2o(jdbcUrl, null, null);
    }

    private void prepareRestHandlers() {
        gson = new GsonBuilder()
            .setFieldNamingPolicy(FieldNamingPolicy.LOWER_CASE_WITH_UNDERSCORES)
            .setDateFormat("yyyy-MM-dd'T'HH:mm:ssX")
            .create();

        jsonTransformer = new JsonTransformer(gson);
        restPatternizer = new RestPatternizer();
    }

    private void prepareRoutes() {
        get     ("/", (request, response) -> getClass().getPackage().getImplementationVersion() == null ?
                                             "Development Version" :
                                             getClass().getPackage().getImplementationVersion(),
                jsonTransformer);

        FoodController foodController = new FoodController(sql2o);
        get     ("/foods", foodController::retrieve, jsonTransformer);

        FoodGroupController foodGroupController = new FoodGroupController(sql2o);
        get     ("/food-groups", foodGroupController::retrieve, jsonTransformer);
    }

    private void prepareGeneric404Handler() {
        ErrorMessage error = new ErrorMessage(HttpStatus.NOT_FOUND_404, "Not Found");
        Route response= (req, res) -> {
            res.type(MediaType.JSON_UTF_8.toString());
            res.status(HttpStatus.NOT_FOUND_404);
            return gson.toJson(error, ErrorMessage.class);
        };

        get     ("*", response);
        post    ("*", response);
        put     ("*", response);
        patch   ("*", response);
        delete  ("*", response);
        head    ("*", response);
        trace   ("*", response);
        connect ("*", response);
    }

    private void prepareCors() {
        cors = new Cors();
        options("/*", (req, res) -> cors.applyCors(res));
        after((req, res) -> {
            if (!req.requestMethod().equals("OPTIONS")) {
                cors.applyCors(res);
            }
        });
    }


    private void prepareGenericExceptionHandler() {
        exception(Exception.class, (e, req, res) -> {
            e.printStackTrace();

            int code = HttpStatus.INTERNAL_SERVER_ERROR_500;
            res.status(code);

            ErrorMessage error = new ErrorMessage(code, "Internal Server Error");
            res.type(MediaType.JSON_UTF_8.toString());
            res.body(gson.toJson(error, ErrorMessage.class));
        });
    }

    public void kill() {
        stop();
    }
}
