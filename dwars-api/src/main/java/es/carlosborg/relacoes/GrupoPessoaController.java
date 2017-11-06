package es.carlosborg.relacoes;

import com.google.common.net.MediaType;
import com.google.gson.Gson;
import es.carlosborg.pessoa.Pessoa;
import es.carlosborg.pessoa.PessoaRepository;
import org.apache.http.HttpStatus;
import spark.Request;
import spark.Response;

import java.util.List;

public class GrupoPessoaController {

    private transient final PessoaRepository pessoaRepository;
    private transient final Gson gson;

    public GrupoPessoaController(PessoaRepository pessoaRepository, Gson gson) {
        this.pessoaRepository = pessoaRepository;
        this.gson = gson;
    }

    public String retrievePessoas(Request req, Response res) {
        List<Pessoa> pessoas = pessoaRepository.find(null, null, Integer.parseInt(req.params("id")));

        res.status(HttpStatus.SC_OK);
        res.type(MediaType.JSON_UTF_8.toString());

        return gson.toJson(pessoas);
    }
}
