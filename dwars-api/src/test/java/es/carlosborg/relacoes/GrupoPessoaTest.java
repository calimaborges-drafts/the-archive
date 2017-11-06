package es.carlosborg.relacoes;

import com.google.common.net.HttpHeaders;
import com.google.common.net.MediaType;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import es.carlosborg.grupo.Grupo;
import es.carlosborg.pessoa.Pessoa;
import es.carlosborg.testing.WebServerTest;
import org.apache.http.HttpStatus;
import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class GrupoPessoaTest extends WebServerTest {

    @Test
    public void tDeveListarPessoasDoGrupo() throws UnirestException {
        Grupo grupo1 = gerar.grupo();
        Grupo grupo2 = gerar.grupo();
        Pessoa pessoa1 = gerar.pessoa();
        Pessoa pessoa2 = gerar.pessoa();
        Pessoa pessoa3 = gerar.pessoa();
        Pessoa pessoa4 = gerar.pessoa();

        grupo1.setId(grupoRepository.add(grupo1).getId());
        grupo2.setId(grupoRepository.add(grupo2).getId());

        pessoa1.setIdGrupo(grupo1.getId());
        pessoa2.setIdGrupo(grupo1.getId());
        pessoa3.setIdGrupo(grupo2.getId());
        pessoa4.setIdGrupo(grupo2.getId());

        pessoa1.setId(pessoaRepository.add(pessoa1).getId());
        pessoa2.setId(pessoaRepository.add(pessoa2).getId());
        pessoa3.setId(pessoaRepository.add(pessoa3).getId());
        pessoa4.setId(pessoaRepository.add(pessoa4).getId());

        HttpResponse<JsonNode> response = Unirest
            .get(kBaseUrl + "/grupo/" + grupo1.getId() + "/pessoas")
            .header(HttpHeaders.ACCEPT, MediaType.JSON_UTF_8.toString())
            .asJson();

        assertEquals(HttpStatus.SC_OK, response.getStatus());

        assertTrue("Quantidade de pessoas no grupo difere de 2", response.getBody().getArray().length() == 2);

        boolean pessoa1Ok = false;
        boolean pessoa2Ok = false;
        for (int i = 0; i < response.getBody().getArray().length(); i++) {
            if (response.getBody().getArray().getJSONObject(i).getString("nome").equals(pessoa1.getNome())) {
                pessoa1Ok = true;
            }

            if (response.getBody().getArray().getJSONObject(i).getString("nome").equals(pessoa2.getNome())) {
                pessoa2Ok = true;
            }
        }

        assertTrue("Nao foi possivel encontrar as pessoas do grupo", pessoa1Ok && pessoa2Ok);
    }


}

