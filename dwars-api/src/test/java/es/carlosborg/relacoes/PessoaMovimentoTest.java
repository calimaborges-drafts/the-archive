package es.carlosborg.relacoes;

import es.carlosborg.testing.WebServerTest;

public class PessoaMovimentoTest extends WebServerTest {

//    @Test
//    public void tDeveCadastrarMovimentoParaPessoa() throws UnirestException {
//
//        Pessoa pessoa1 = gerar.pessoa();
//        Movimento movimento1 = gerar.movimento();
//
//        HttpResponse<JsonNode> response = Unirest
//            .get(kBaseUrl + "/pessoa/" + pessoa1.getId() + "/movimento/" + movimento1.getId())
//            .header(HttpHeaders.ACCEPT, MediaType.JSON_UTF_8.toString())
//            .asJson();
//
//        assertEquals(HttpStatus.SC_OK, response.getStatus());
//
//        List<Movimento> movimentos = movimentoRepository.findByPessoa(pessoa1.getId());
//
//        assertFalse("Movimento " + movimento1.getTitulo() + " nao encontrado para pessoa " + pessoa1.getNome(), movimentos.isEmpty());
//
//    }

}
