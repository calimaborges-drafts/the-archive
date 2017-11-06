package es.carlosborg.pessoa;

import com.google.common.net.MediaType;
import com.google.gson.Gson;
import org.apache.http.HttpStatus;
import spark.Request;
import spark.Response;

import java.util.List;

public class PessoaController {

    private transient final PessoaRepository repository;
    private transient final Gson gson;

    public PessoaController(PessoaRepository repository, Gson gson) {
        this.repository = repository;
        this.gson = gson;
    }

    public String create(Request req, Response res) {
        Integer grupoId = null;
        if (req.queryParams("grupo") != null) {
            grupoId = Integer.parseInt(req.queryParams("grupo"));
        }
        Pessoa pessoa = repository.add(req.queryParams("nome"), req.queryParams("email"), grupoId);

        res.status(HttpStatus.SC_CREATED);
        res.type(MediaType.JSON_UTF_8.toString());

        return gson.toJson(pessoa, Pessoa.class);
    }

    @SuppressWarnings("UnusedParameters")
    public String retrieve(Request req, Response res) {
        List<Pessoa> pessoas = repository.all();

        res.status(HttpStatus.SC_OK);
        res.type(MediaType.JSON_UTF_8.toString());

        return gson.toJson(pessoas);
    }

    public String update(Request req, Response res) {
        Integer grupoId = null;
        if (req.queryParams("grupo") != null) {
            grupoId = Integer.parseInt(req.queryParams("grupo"));
        }

        Pessoa pessoa = repository.update(Integer.parseInt(req.params("id")), req.queryParams("nome"), req.queryParams("email"), grupoId);

        res.status(HttpStatus.SC_OK);
        res.type(MediaType.JSON_UTF_8.toString());

        return gson.toJson(pessoa, Pessoa.class);
    }

    @SuppressWarnings("SameReturnValue")
    public String delete(Request req, Response res) {
        repository.remove(Integer.parseInt(req.params("id")));

        res.status(HttpStatus.SC_NO_CONTENT);

        return "";
    }

}
