package es.carlosborg.objetivo;

import com.google.common.net.MediaType;
import com.google.gson.Gson;
import org.apache.http.HttpStatus;
import spark.Request;
import spark.Response;

import java.util.List;

public class ObjetivoController {

    private transient final ObjetivoRepository repository;
    private transient final Gson gson;

    public ObjetivoController(ObjetivoRepository repository, Gson gson) {
        this.repository = repository;
        this.gson = gson;
    }

    public String create(Request req, Response res) {
        Objetivo objetivo = repository.add(req.queryParams("titulo"), req.queryParams("descricao"));

        res.status(HttpStatus.SC_CREATED);
        res.type(MediaType.JSON_UTF_8.toString());

        return gson.toJson(objetivo, Objetivo.class);
    }

    public String retrieve(Request req, Response res) {
        List<Objetivo> objetivos = repository.all();

        res.status(HttpStatus.SC_OK);
        res.type(MediaType.JSON_UTF_8.toString());

        return gson.toJson(objetivos);
    }

    public String update(Request req, Response res) {
        Objetivo objetivo = repository.update(Integer.parseInt(req.params("id")), req.queryParams("titulo"), req.queryParams("descricao"));

        res.status(HttpStatus.SC_OK);
        res.type(MediaType.JSON_UTF_8.toString());

        return gson.toJson(objetivo, Objetivo.class);
    }

    public String delete(Request req, Response res) {
        repository.remove(Integer.parseInt(req.params("id")));

        res.status(HttpStatus.SC_NO_CONTENT);

        return "";
    }
}
