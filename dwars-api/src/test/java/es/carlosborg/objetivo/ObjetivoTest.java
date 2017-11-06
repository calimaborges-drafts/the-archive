package es.carlosborg.objetivo;

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

public class ObjetivoTest extends WebServerTest {

    @Test
    public void tDeveCadastrarObjetivo() throws UnirestException {
        Objetivo objetivo = gerar.objetivo();

        HttpResponse<JsonNode> response = Unirest
            .post(kBaseUrl + "/objetivo")
            .header(HttpHeaders.ACCEPT, MediaType.JSON_UTF_8.toString())
            .field("titulo", objetivo.getTitulo())
            .field("descricao", objetivo.getDescricao())
            .asJson();

        assertEquals(HttpStatus.SC_CREATED, response.getStatus());

        List<Objetivo> objetivos = objetivoRepository.find(objetivo.getTitulo(), objetivo.getDescricao());
        assertFalse("Objetivo com titulo " + objetivo.getTitulo() + " nao encontrado.", objetivos.isEmpty());
    }

    @Test
    public void tDeveListarObjetivo() throws UnirestException {
        Objetivo objetivo = gerar.objetivo();

        objetivoRepository.add(objetivo);

        HttpResponse<JsonNode> response = Unirest
            .get(kBaseUrl + "/objetivos")
            .header(HttpHeaders.ACCEPT, MediaType.JSON_UTF_8.toString())
            .asJson();

        assertEquals(HttpStatus.SC_OK, response.getStatus());
        assertEquals(objetivo.getTitulo(), response.getBody().getArray().getJSONObject(0).getString("titulo"));
        assertEquals(objetivo.getDescricao(), response.getBody().getArray().getJSONObject(0).getString("descricao"));
    }

    @Test
    public void tDeveAtualizarObjetivo() throws UnirestException {
        Objetivo objetivoAntigo = gerar.objetivo();
        Objetivo objetivoNovo = gerar.objetivo();

        Objetivo objetivoId = objetivoRepository.add(objetivoAntigo);

        HttpResponse<JsonNode> response = Unirest
            .put(kBaseUrl + "/objetivo/" + objetivoId.getId())
            .header(HttpHeaders.ACCEPT, MediaType.JSON_UTF_8.toString())
            .field("titulo", objetivoNovo.getTitulo())
            .field("descricao", objetivoNovo.getDescricao())
            .asJson();

        assertEquals(HttpStatus.SC_OK, response.getStatus());

        List<Objetivo> objetivos = objetivoRepository.find(objetivoNovo.getTitulo(), objetivoNovo.getDescricao());
        assertFalse("Objetivo com titulo " + objetivoNovo.getTitulo() + " nao encontrado", objetivos.isEmpty());
    }

    @Test
    public void tDeveRemoverObjetivo() throws UnirestException {
        Objetivo objetivo1 = gerar.objetivo();
        Objetivo objetivo2 = gerar.objetivo();

        objetivo1.setId(objetivoRepository.add(objetivo1).getId());
        objetivo2.setId(objetivoRepository.add(objetivo2).getId());

        HttpResponse<String> response = Unirest
            .delete(kBaseUrl + "/objetivo/" + objetivo1.getId())
            .asString();

        List<Objetivo> objetivos = objetivoRepository.find(objetivo1.getTitulo(), objetivo1.getDescricao());

        assertEquals(HttpStatus.SC_NO_CONTENT, response.getStatus());
        assertTrue("O objetivo ainda existe", objetivos.isEmpty());

        objetivos = objetivoRepository.all();
        assertTrue("Deveria existir pelo menos 1 objetivo", objetivos.size() > 0);
    }

    @Test
    public void tDeveAtualizarSomenteObjetivoCerto() throws UnirestException {
        Objetivo objetivo1 = gerar.objetivo();
        Objetivo objetivo2 = gerar.objetivo();
        Objetivo objetivoNovo = gerar.objetivo();

        objetivo1.setId(objetivoRepository.add(objetivo1).getId());
        objetivo2.setId(objetivoRepository.add(objetivo2).getId());

        HttpResponse<JsonNode> response = Unirest
            .put(kBaseUrl + "/objetivo/" + objetivo2.getId())
            .header(HttpHeaders.ACCEPT, MediaType.JSON_UTF_8.toString())
            .field("titulo", objetivoNovo.getTitulo())
            .field("descricao", objetivoNovo.getDescricao())
            .asJson();

        assertEquals(HttpStatus.SC_OK, response.getStatus());

        List<Objetivo> objetivos = objetivoRepository.find(objetivoNovo.getTitulo(), objetivoNovo.getDescricao());
        assertFalse("Objetivo com titulo " + objetivoNovo.getTitulo() + " nao encontrado.", objetivos.isEmpty());
        assertFalse("Objetivo com nome " + objetivoNovo.getTitulo() + " foi encontrado mais de 1 vez.", objetivos.size() > 1);
    }
}
