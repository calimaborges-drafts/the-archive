package es.carlosborg.grupo;

import com.google.common.net.MediaType;
import com.google.gson.Gson;
import org.apache.http.HttpStatus;
import spark.Request;
import spark.Response;

import java.util.List;

public class GrupoController {

    private transient final GrupoRepository repository;
    private transient final Gson gson;

    public GrupoController(GrupoRepository repository, Gson gson) {
        this.repository= repository;
        this.gson = gson;
    }

    public String create(Request req, Response res) {
        Grupo novoGrupo = repository.add(req.queryParams("nome"));

        res.status(HttpStatus.SC_CREATED);
        res.type(MediaType.JSON_UTF_8.toString());

        return gson.toJson(novoGrupo, Grupo.class);
    }

    public String retrieve(Request req, Response res) {
        List<Grupo> grupos = repository.all();

        res.status(HttpStatus.SC_OK);
        res.type(MediaType.JSON_UTF_8.toString());

        return gson.toJson(grupos);
    }

    public String update(Request req, Response res) {
        Grupo grupo = repository.update(Integer.parseInt(req.params("id")), req.queryParams("nome"));

        res.status(HttpStatus.SC_OK);
        res.type(MediaType.JSON_UTF_8.toString());

        return gson.toJson(grupo, Grupo.class);
    }

    public String delete(Request req, Response res) {
        repository.remove(Integer.parseInt(req.params("id")));

        res.status(HttpStatus.SC_NO_CONTENT);

        return "";
    }
}
