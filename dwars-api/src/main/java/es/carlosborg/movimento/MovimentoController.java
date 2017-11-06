package es.carlosborg.movimento;

import com.google.common.net.MediaType;
import com.google.gson.Gson;
import org.apache.http.HttpStatus;
import spark.Request;
import spark.Response;

import java.util.List;

public class MovimentoController {

    private transient final MovimentoRepository repository;
    private transient final Gson gson ;

    public MovimentoController(MovimentoRepository repository, Gson gson) {
        this.repository= repository;
        this.gson = gson;
    }

    public String create(Request req, Response res) {
        AreaNegocioMovimento area = null;
        if (req.queryParams("area_negocio") != null) {
             area = AreaNegocioMovimento.valueOf(req.queryParams("area_negocio"));
        }

        EscopoMovimento escopo = null;
        if (req.queryParams("escopo") != null) {
            escopo = EscopoMovimento.valueOf(req.queryParams("escopo"));
        }

        Integer pontuacao = null;
        if (req.queryParams("pontuacao") != null) {
            pontuacao = Integer.parseInt(req.queryParams("pontuacao"));
        }

        Movimento novoMovimento = repository.add(req.queryParams("titulo"), req.queryParams("descricao"),
            area, escopo, pontuacao, req.queryParams("unidade_medida"));

        res.status(HttpStatus.SC_CREATED);
        res.type(MediaType.JSON_UTF_8.toString());

        return gson.toJson(novoMovimento, Movimento.class);
    }

    @SuppressWarnings("UnusedParameters")
    public String retrieve(Request req, Response res) {
        List<Movimento> movimentos = repository.all();

        res.status(HttpStatus.SC_OK);
        res.type(MediaType.JSON_UTF_8.toString());

        return gson.toJson(movimentos);
    }

    public String update(Request req, Response res) {
        AreaNegocioMovimento area = null;
        if (req.queryParams("area_negocio") != null) {
            area = AreaNegocioMovimento.valueOf(req.queryParams("area_negocio"));
        }

        EscopoMovimento escopo = null;
        if (req.queryParams("escopo") != null) {
            escopo = EscopoMovimento.valueOf(req.queryParams("escopo"));
        }

        Integer pontuacao = null;
        if (req.queryParams("pontuacao") != null) {
            pontuacao = Integer.parseInt(req.queryParams("pontuacao"));
        }

        Movimento movimento = repository.update(Integer.parseInt(req.params("id")), req.queryParams("titulo"), req.queryParams("descricao"),
            area, escopo, pontuacao, req.queryParams("unidade_medida"));

        res.status(HttpStatus.SC_OK);
        res.type(MediaType.JSON_UTF_8.toString());

        return gson.toJson(movimento, Movimento.class);
    }

    @SuppressWarnings("SameReturnValue")
    public String delete(Request req, Response res) {
        repository.remove(Integer.parseInt(req.params("id")));

        res.status(HttpStatus.SC_NO_CONTENT);

        return "";
    }

}
