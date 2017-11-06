package es.carlosborg;

import com.google.common.net.MediaType;
import com.google.gson.FieldNamingPolicy;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import es.carlosborg.commons.Dotenv;
import es.carlosborg.commons.ErrorMessage;
import es.carlosborg.grupo.GrupoController;
import es.carlosborg.grupo.GrupoRepository;
import es.carlosborg.movimento.MovimentoController;
import es.carlosborg.movimento.MovimentoRepository;
import es.carlosborg.objetivo.ObjetivoController;
import es.carlosborg.objetivo.ObjetivoRepository;
import es.carlosborg.pessoa.PessoaController;
import es.carlosborg.pessoa.PessoaRepository;
import es.carlosborg.relacoes.GrupoPessoaController;
import org.eclipse.jetty.http.HttpStatus;
import org.flywaydb.core.Flyway;
import org.sql2o.Sql2o;
import spark.Route;

import javax.servlet.http.HttpServletResponse;
import java.io.File;

import static spark.Spark.*;

public class App {

    private static final String kDefaultDatabaseUrl = "jdbc:h2:./database";
    private static final Integer kDefaultPort = 8080;

    private Sql2o sql2o;
    private Gson gson;

    public static void main( String[] args ) throws Exception {
        new Dotenv().load(new File(".env"));

        App app = new App();
        app.start(System.getenv("PORT"), System.getenv("JDBC_DATABASE_URL"));
    }

    public void start(String port, String jdbcUrl) {

        prepareServer(port);

        prepareDatabase(jdbcUrl);

        prepareResponseHandlers();

        prepareApiRoutes();

        prepareGenericExceptionHandler();

        prepareGeneric404Handler();

        awaitInitialization();

    }

    public void end() {
        stop();
    }

    public Sql2o getSql2oInstance() {
        return sql2o;
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

    private void prepareDatabase(String jdbcUrl) {
        String dbUrl;

        if (jdbcUrl == null) {
            dbUrl = kDefaultDatabaseUrl;
        } else {
            dbUrl = jdbcUrl;
        }

        Flyway flyway = new Flyway();
        flyway.setDataSource(dbUrl, null, null);
        flyway.migrate();

        sql2o = new Sql2o(dbUrl, null, null);
    }

    private void prepareResponseHandlers() {
        gson = new GsonBuilder()
            .setFieldNamingPolicy(FieldNamingPolicy.LOWER_CASE_WITH_UNDERSCORES)
            .create();
    }

    private void prepareApiRoutes() {

        GrupoRepository grupoRepository = new GrupoRepository(sql2o);
        GrupoController grupoController = new GrupoController(grupoRepository, gson);
        post    ("/grupo", grupoController::create);
        get     ("/grupos", grupoController::retrieve);
        put     ("/grupo/:id", grupoController::update);
        delete  ("/grupo/:id", grupoController::delete);

        PessoaRepository pessoaRepository = new PessoaRepository(sql2o);
        PessoaController pessoaController = new PessoaController(pessoaRepository, gson);
        post    ("/pessoa", pessoaController::create);
        get     ("/pessoas", pessoaController::retrieve);
        put     ("/pessoa/:id", pessoaController::update);
        delete  ("/pessoa/:id", pessoaController::delete);

        MovimentoRepository movimentoRepository = new MovimentoRepository(sql2o);
        MovimentoController movimentoController = new MovimentoController(movimentoRepository, gson);
        post    ("/movimento", movimentoController::create);
        get     ("/movimentos", movimentoController::retrieve);
        put     ("/movimento/:id", movimentoController::update);
        delete  ("/movimento/:id", movimentoController::delete);

        ObjetivoRepository objetivoRepository = new ObjetivoRepository(sql2o);
        ObjetivoController objetivoController = new ObjetivoController(objetivoRepository, gson);
        post    ("/objetivo", objetivoController::create);
        get     ("/objetivos", objetivoController::retrieve);
        put     ("/objetivo/:id", objetivoController::update);
        delete  ("/objetivo/:id", objetivoController::delete);

        GrupoPessoaController grupoPessoaController = new GrupoPessoaController(pessoaRepository, gson);
        get     ("/grupo/:id/pessoas", grupoPessoaController::retrievePessoas);

//        PessoaMovimentoController pessoaMovimentoController = new PessoaMovimentoController(grupoRepository, pessoaRepository, gson);
//        post    ("/pessoa/:idPessoa/movimento/:idMovimento", pessoaMovimentoController::create);

    }

    private void prepareGeneric404Handler() {
        ErrorMessage error = new ErrorMessage(HttpStatus.NOT_FOUND_404, "Not Found");
        Route resposta = (req, res) -> {
            res.type(MediaType.JSON_UTF_8.toString());
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
        options ("*", resposta);
    }

    private void prepareGenericExceptionHandler() {
        exception(Exception.class, (e, req, res) -> {
            e.printStackTrace();

            int code = HttpStatus.INTERNAL_SERVER_ERROR_500;
            res.status(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);

            ErrorMessage error = new ErrorMessage(code, "Internal Server Error");
            res.type(MediaType.JSON_UTF_8.toString());
            res.body(gson.toJson(error, ErrorMessage.class));
        });
    }
}
