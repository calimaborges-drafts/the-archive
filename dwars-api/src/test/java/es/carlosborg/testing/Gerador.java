package es.carlosborg.testing;

import com.github.javafaker.Faker;
import es.carlosborg.grupo.Grupo;
import es.carlosborg.movimento.AreaNegocioMovimento;
import es.carlosborg.movimento.EscopoMovimento;
import es.carlosborg.movimento.Movimento;
import es.carlosborg.objetivo.Objetivo;
import es.carlosborg.pessoa.Pessoa;

import java.util.Random;

public class Gerador {

    private Faker faker = new Faker();

    public Pessoa pessoa() {
        Pessoa pessoa = new Pessoa();
        pessoa.setNome(faker.name().fullName());
        pessoa.setEmail(faker.internet().emailAddress());

        return pessoa;
    }

    public Grupo grupo() {
        Grupo grupo = new Grupo();
        grupo.setNome(faker.company().name());

        return grupo;
    }

    public Movimento movimento() {
        Movimento movimento = new Movimento();
        movimento.setTitulo(faker.lorem().sentence());
        movimento.setDescricao(faker.lorem().paragraph());
        movimento.setAreaNegocio(AreaNegocioMovimento.values()[new Random().nextInt(AreaNegocioMovimento.values().length)]);
        movimento.setEscopo(EscopoMovimento.values()[new Random().nextInt(EscopoMovimento.values().length)]);
        movimento.setPontuacao(new Random().nextInt(4000));
        movimento.setUnidadeMedida(faker.lorem().word());

        return movimento;
    }

    public Objetivo objetivo() {
        Objetivo objetivo = new Objetivo();
        objetivo.setTitulo(faker.lorem().sentence());
        objetivo.setDescricao(faker.lorem().paragraph());

        return objetivo;
    }
}
