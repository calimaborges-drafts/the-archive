package es.carlosborg.grupo;

import com.google.common.net.HttpHeaders;
import com.google.common.net.MediaType;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import es.carlosborg.testing.WebServerTest;
import org.apache.http.HttpStatus;
import org.junit.Test;

import java.util.List;

import static org.junit.Assert.*;

public class GrupoTest extends WebServerTest {

    @Test
    public void tDeveCadastrarGrupo() throws UnirestException {
        Grupo grupo = gerar.grupo();

        HttpResponse<JsonNode> response = Unirest
            .post(kBaseUrl + "/grupo")
            .header(HttpHeaders.ACCEPT, MediaType.JSON_UTF_8.toString())
            .field("nome", grupo.getNome())
            .asJson();

        assertEquals(HttpStatus.SC_CREATED, response.getStatus());

        List<Grupo> grupos = grupoRepository.find(grupo.getNome());
        assertFalse("Grupo com nome " + grupo.getNome() + " nao encontrado.", grupos.isEmpty());
    }

    @Test
    public void tDeveListarGrupos() throws UnirestException {
        Grupo grupo = gerar.grupo();

        grupoRepository.add(grupo.getNome());

        HttpResponse<JsonNode> response = Unirest
            .get(kBaseUrl + "/grupos")
            .header(HttpHeaders.ACCEPT, MediaType.JSON_UTF_8.toString())
            .asJson();

        assertEquals(HttpStatus.SC_OK, response.getStatus());
        assertEquals(grupo.getNome(), response.getBody().getArray().getJSONObject(0).getString("nome"));
    }

    @Test
    public void tDeveAtualizarGrupo() throws UnirestException {
        Grupo grupoAntigo = gerar.grupo();
        Grupo grupoNovo = gerar.grupo();

        Grupo grupo = grupoRepository.add(grupoAntigo.getNome());

        HttpResponse<JsonNode> response = Unirest
            .put(kBaseUrl + "/grupo/" + grupo.getId())
            .header(HttpHeaders.ACCEPT, MediaType.JSON_UTF_8.toString())
            .field("nome", grupoNovo.getNome())
            .asJson();

        assertEquals(HttpStatus.SC_OK, response.getStatus());

        List<Grupo> grupos = grupoRepository.find(grupoNovo.getNome());
        assertFalse("Grupo com nome " + grupoNovo.getNome() + " nao encontrado.", grupos.isEmpty());
    }

    @Test
    public void tDeveRemoverGrupo() throws UnirestException {
        Grupo grupo1 = gerar.grupo();
        Grupo grupo2 = gerar.grupo();

        grupo1.setId(grupoRepository.add(grupo1.getNome()).getId());
        grupo2.setId(grupoRepository.add(grupo2.getNome()).getId());

        HttpResponse<String> response = Unirest
            .delete(kBaseUrl + "/grupo/" + grupo1.getId())
            .asString();

        assertEquals(HttpStatus.SC_NO_CONTENT, response.getStatus());

        List<Grupo> grupos = grupoRepository.find(grupo1.getNome());
        assertTrue("O grupo ainda existe.", grupos.isEmpty());

        grupos = grupoRepository.all();
        assertTrue("Deveria existir pelo menos 1 grupo", grupos.size() > 0);

    }

    @Test
    public void tDeveAtualizarSomenteGrupoCerto() throws UnirestException {
        Grupo grupo1 = gerar.grupo();
        Grupo grupo2 = gerar.grupo();
        Grupo grupoNovo = gerar.grupo();

        grupo1.setId(grupoRepository.add(grupo1.getNome()).getId());
        grupo2.setId(grupoRepository.add(grupo2.getNome()).getId());

        HttpResponse<JsonNode> response = Unirest
            .put(kBaseUrl + "/grupo/" + grupo2.getId())
            .header(HttpHeaders.ACCEPT, MediaType.JSON_UTF_8.toString())
            .field("nome", grupoNovo.getNome())
            .asJson();

        assertEquals(HttpStatus.SC_OK, response.getStatus());

        List<Grupo> grupos = grupoRepository.find(grupoNovo.getNome());

        assertFalse("Grupo com nome " + grupoNovo.getNome() + " nao encontrado.", grupos.isEmpty());
        assertFalse("Grupo com nome " + grupoNovo.getNome() + " foi encontrado mais de 1 vez.", grupos.size() > 1);
    }
}
