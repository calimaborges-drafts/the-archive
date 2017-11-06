package es.carlosborg.movimento;

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

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class MovimentoTest extends WebServerTest {

    @Test
    public void tDeveCadastrarMovimento() throws UnirestException {
        Movimento movimento = gerar.movimento();

        HttpResponse<JsonNode> response = Unirest
            .post(kBaseUrl + "/movimento")
            .header(HttpHeaders.ACCEPT, MediaType.JSON_UTF_8.toString())
            .field("titulo", movimento.getTitulo())
            .field("descricao", movimento.getDescricao())
            .field("area_negocio", movimento.getAreaNegocio().name())
            .field("escopo", movimento.getEscopo().name())
            .field("pontuacao", movimento.getPontuacao())
            .field("unidade_medida", movimento.getUnidadeMedida())
            .asJson();

        assertEquals(HttpStatus.SC_CREATED, response.getStatus());

        List<Movimento> movimentos = movimentoRepository.find(movimento.getTitulo(), movimento.getDescricao(),
            movimento.getAreaNegocio(), movimento.getEscopo(), movimento.getPontuacao(), movimento.getUnidadeMedida());

        assertFalse("Movimento de título " + movimento.getTitulo() + " nao encontrado.", movimentos.isEmpty());
    }

    @Test
    public void tDeveListarMovimentos() throws UnirestException {
        Movimento movimento = gerar.movimento();

        movimentoRepository.add(movimento);

        HttpResponse<JsonNode> response = Unirest
            .get(kBaseUrl + "/movimentos")
            .header(HttpHeaders.ACCEPT, MediaType.JSON_UTF_8.toString())
            .asJson();

        assertEquals(HttpStatus.SC_OK, response.getStatus());
        assertEquals(movimento.getTitulo(), response.getBody().getArray().getJSONObject(0).getString("titulo"));
        assertEquals(movimento.getDescricao(), response.getBody().getArray().getJSONObject(0).getString("descricao"));
        assertEquals(movimento.getAreaNegocio(), AreaNegocioMovimento.valueOf(response.getBody().getArray().getJSONObject(0).getString("area_negocio")));
        assertEquals(movimento.getEscopo(), EscopoMovimento.valueOf(response.getBody().getArray().getJSONObject(0).getString("escopo")));
        assertEquals((int) movimento.getPontuacao(), response.getBody().getArray().getJSONObject(0).getInt("pontuacao"));
        assertEquals(movimento.getUnidadeMedida(), response.getBody().getArray().getJSONObject(0).getString("unidade_medida"));
    }

    @Test
    public void tDeveAtualizarMovimento() throws UnirestException {
        Movimento movimentoNovo = gerar.movimento();
        Movimento movimentoAntigo = gerar.movimento();

        Movimento movimento = movimentoRepository.add(movimentoAntigo);

        HttpResponse<JsonNode> response = Unirest
            .put(kBaseUrl + "/movimento/" + movimento.getId())
            .header(HttpHeaders.ACCEPT, MediaType.JSON_UTF_8.toString())
            .field("titulo", movimentoNovo.getTitulo())
            .field("descricao", movimentoNovo.getDescricao())
            .field("area_negocio", movimentoNovo.getAreaNegocio())
            .field("escopo", movimentoNovo.getEscopo())
            .field("pontuacao", movimentoNovo.getPontuacao())
            .field("unidade_medida", movimentoNovo.getUnidadeMedida())
            .asJson();

        assertEquals(HttpStatus.SC_OK, response.getStatus());

        List<Movimento> movimentos = movimentoRepository.find(movimentoNovo.getTitulo(), movimentoNovo.getDescricao(),
            movimentoNovo.getAreaNegocio(), movimentoNovo.getEscopo(), movimentoNovo.getPontuacao(), movimentoNovo.getUnidadeMedida());

        assertFalse("Movimento de titulo " + movimentoNovo.getTitulo() + " nao encontrado.", movimentos.isEmpty());
    }

    @Test
    public void tDeveRemoverMovimento() throws UnirestException {
        Movimento movimento1 = gerar.movimento();
        Movimento movimento2 = gerar.movimento();

        movimento1.setId(movimentoRepository.add(movimento1).getId());
        movimento2.setId(movimentoRepository.add(movimento2).getId());

        HttpResponse<String> response = Unirest
            .delete(kBaseUrl + "/movimento/" + movimento1.getId())
            .asString();

        assertEquals(HttpStatus.SC_NO_CONTENT, response.getStatus());

        List<Movimento> movimentos = movimentoRepository.find(movimento1.getTitulo(), movimento1.getDescricao(),
            movimento1.getAreaNegocio(), movimento1.getEscopo(), movimento1.getPontuacao(), movimento1.getUnidadeMedida());

        assertTrue("O movimento ainda existe", movimentos.isEmpty());

        movimentos = movimentoRepository.all();
        assertTrue("Deveria existir pelo menos 1 movimento", movimentos.size() > 0);

    }

    @Test
    public void tDeveAtualizarSomenteMovimentoCerto() throws UnirestException {
        Movimento movimento1 = gerar.movimento();
        Movimento movimento2 = gerar.movimento();
        Movimento movimentoNovo = gerar.movimento();

        movimento1.setId(movimentoRepository.add(movimento1).getId());
        movimento2.setId(movimentoRepository.add(movimento2).getId());

        HttpResponse<JsonNode> response = Unirest
            .put(kBaseUrl + "/movimento/" + movimento2.getId())
            .header(HttpHeaders.ACCEPT, MediaType.JSON_UTF_8.toString())
            .field("titulo", movimentoNovo.getTitulo())
            .asJson();

        assertEquals(HttpStatus.SC_OK, response.getStatus());

        List<Movimento> movimentos = movimentoRepository.find(movimentoNovo.getTitulo(), null, null, null, null, null);

        assertFalse("Movimento com titulo " + movimentoNovo.getTitulo() + " nao encontrado.", movimentos.isEmpty());
        assertFalse("Movimento com titulo " + movimentoNovo.getTitulo() + " foi encontrado mais de 1 vez.", movimentos.size() > 1);
    }

}
