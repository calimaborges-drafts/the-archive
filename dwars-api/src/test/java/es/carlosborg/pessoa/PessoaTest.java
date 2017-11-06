package es.carlosborg.pessoa;

import com.google.common.net.HttpHeaders;
import com.google.common.net.MediaType;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import es.carlosborg.grupo.Grupo;
import es.carlosborg.testing.WebServerTest;
import org.apache.http.HttpStatus;
import org.junit.Test;

import java.util.List;

import static org.junit.Assert.*;

public class PessoaTest extends WebServerTest {

    @Test
    public void tDeveCadastrarPessoa() throws UnirestException {
        Pessoa pessoa = gerar.pessoa();

        HttpResponse<JsonNode> response = Unirest
            .post(kBaseUrl + "/pessoa")
            .header(HttpHeaders.ACCEPT, MediaType.JSON_UTF_8.toString())
            .field("nome", pessoa.getNome())
            .field("email", pessoa.getEmail())
            .asJson();

        assertEquals(HttpStatus.SC_CREATED, response.getStatus());

        List<Pessoa> pessoas = pessoaRepository.find(pessoa.getNome(), pessoa.getEmail(), null);
        assertFalse("Pessoa com nome " + pessoa.getNome() + " nao encontrada", pessoas.isEmpty());
    }

    @Test
    public void tDeveListarPessoas() throws UnirestException {
        Pessoa pessoa = gerar.pessoa();

        pessoaRepository.add(pessoa);

        HttpResponse<JsonNode> response = Unirest
            .get(kBaseUrl + "/pessoas")
            .header(HttpHeaders.ACCEPT, MediaType.JSON_UTF_8.toString())
            .asJson();

        assertEquals(HttpStatus.SC_OK, response.getStatus());
        assertEquals(pessoa.getNome(), response.getBody().getArray().getJSONObject(0).getString("nome"));
        assertEquals(pessoa.getEmail(), response.getBody().getArray().getJSONObject(0).getString("email"));
    }

    @Test
    public void tDeveAtualizarPessoa() throws UnirestException {
        Pessoa pessoaAntiga = gerar.pessoa();
        Pessoa pessoaNova = gerar.pessoa();

        Pessoa pessoaId = pessoaRepository.add(pessoaAntiga);

        HttpResponse<JsonNode> response = Unirest
            .put(kBaseUrl + "/pessoa/" + pessoaId.getId())
            .header(HttpHeaders.ACCEPT, MediaType.JSON_UTF_8.toString())
            .field("nome", pessoaNova.getNome())
            .field("email", pessoaNova.getEmail())
            .asJson();

        assertEquals(HttpStatus.SC_OK, response.getStatus());

        List<Pessoa> pessoas = pessoaRepository.find(pessoaNova.getNome(), pessoaNova.getEmail(), null);
        assertFalse("Pessoa com nome " + pessoaNova.getNome() + " nao encontrada", pessoas.isEmpty());
    }

    @Test
    public void tDeveRemoverPessoa() throws UnirestException {
        Pessoa pessoa1 = gerar.pessoa();
        Pessoa pessoa2 = gerar.pessoa();

        pessoa1.setId(pessoaRepository.add(pessoa1).getId());
        pessoa2.setId(pessoaRepository.add(pessoa2).getId());

        HttpResponse<String> response = Unirest
            .delete(kBaseUrl + "/pessoa/" + pessoa1.getId())
            .asString();

        List<Pessoa> pessoas = pessoaRepository.find(pessoa1.getNome(), pessoa1.getEmail(), null);

        assertEquals(HttpStatus.SC_NO_CONTENT, response.getStatus());
        assertTrue("A pessoa ainda existe", pessoas.isEmpty());

        pessoas = pessoaRepository.all();
        assertTrue("Deveria existir pelo menos 1 pessoa", pessoas.size() > 0);
    }

    @Test
    public void tDeveAtualizarPessoaAdicionandoGrupo() throws UnirestException {
        Pessoa pessoa = gerar.pessoa();
        Grupo grupo = gerar.grupo();

        Pessoa pessoaId = pessoaRepository.add(pessoa);
        Grupo grupoId = grupoRepository.add(grupo.getNome());

        HttpResponse<JsonNode> response = Unirest
            .put(kBaseUrl + "/pessoa/" + pessoaId.getId())
            .header(HttpHeaders.ACCEPT, MediaType.JSON_UTF_8.toString())
            .field("grupo", grupoId.getId())
            .asJson();

        assertEquals(HttpStatus.SC_OK, response.getStatus());

        List<Pessoa> pessoas = pessoaRepository.find(pessoa.getNome(), pessoa.getEmail(), grupoId.getId());
        assertFalse("Pessoa com grupo " + grupoId + "(" + grupoId.getId() + ") nao encontrada.", pessoas.isEmpty());
    }

    @Test
    public void tDeveAdicionarPessoaComGrupo() throws UnirestException {
        Pessoa pessoa = gerar.pessoa();
        Grupo grupo = gerar.grupo();

        Grupo grupoId = grupoRepository.add(grupo.getNome());

        HttpResponse<JsonNode> response = Unirest
            .post(kBaseUrl + "/pessoa")
            .header(HttpHeaders.ACCEPT, MediaType.JSON_UTF_8.toString())
            .field("nome", pessoa.getNome())
            .field("email", pessoa.getEmail())
            .field("grupo", grupoId.getId())
            .asJson();

        assertEquals(HttpStatus.SC_CREATED, response.getStatus());

        List<Pessoa> pessoas = pessoaRepository.find(pessoa.getNome(), pessoa.getEmail(), grupo.getId());
        assertFalse("Pessoa com grupo " + grupo + "(" + grupo.getId() + ") nao encontrada.", pessoas.isEmpty());
    }

    @Test
    public void tDeveAtualizarSomentePessoaCerta() throws UnirestException {
        Pessoa pessoa1 = gerar.pessoa();
        Pessoa pessoa2 = gerar.pessoa();
        Pessoa pessoaNova = gerar.pessoa();

        pessoa1.setId(pessoaRepository.add(pessoa1).getId());
        pessoa2.setId(pessoaRepository.add(pessoa2).getId());

        HttpResponse<JsonNode> response = Unirest
            .put(kBaseUrl + "/pessoa/" + pessoa2.getId())
            .header(HttpHeaders.ACCEPT, MediaType.JSON_UTF_8.toString())
            .field("nome", pessoaNova.getNome())
            .asJson();

        assertEquals(HttpStatus.SC_OK, response.getStatus());

        List<Pessoa> pessoas = pessoaRepository.find(pessoaNova.getNome(), null, null);
        assertFalse("Pessoa com nome " + pessoaNova.getNome() + " nao encontrada.", pessoas.isEmpty());
        assertFalse("Pessoa com nome " + pessoaNova.getNome() + " foi encontrada mais de 1 vez.", pessoas.size() > 1);
    }
}
