package es.carlosborg.movimento;

import org.sql2o.Connection;
import org.sql2o.Query;
import org.sql2o.Sql2o;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MovimentoRepository {

    private transient final Sql2o sql2o;

    public MovimentoRepository(Sql2o sql2o) {
        this.sql2o = sql2o;
    }

    public Movimento add(String titulo, String descricao, AreaNegocioMovimento area, EscopoMovimento escopo, Integer pontuacao, String unidade) {
        String sql = "insert into movimento(titulo, descricao, area_negocio, escopo, pontuacao, unidade_medida) " +
            "values(:titulo, :descricao, :area, :escopo, :pontuacao, :unidade)";

        Connection con = sql2o.open();
        Integer id = (Integer) con.createQuery(sql, true)
            .addParameter("titulo", titulo)
            .addParameter("descricao", descricao)
            .addParameter("area", area.ordinal())
            .addParameter("escopo", escopo.ordinal())
            .addParameter("pontuacao", pontuacao)
            .addParameter("unidade", unidade)
            .executeUpdate()
            .getKey();

        Movimento movimento = new Movimento();
        movimento.setId(id);

        return movimento;
    }

    public Movimento add(Movimento movimento) {

        return add(movimento.getTitulo(), movimento.getDescricao(), movimento.getAreaNegocio(), movimento.getEscopo(),
            movimento.getPontuacao(), movimento.getUnidadeMedida());

    }

    public List<Movimento> all() {
        return find(null, null, null, null, null, null);
    }

    public List<Movimento> find(String titulo, String descricao, AreaNegocioMovimento area, EscopoMovimento escopo, Integer pontuacao, String unidade) {
        List<String> wheres = new ArrayList<>();
        Map<String, Object> parameters = new HashMap<>();

        if (titulo != null) {
            wheres.add("titulo = :titulo");
            parameters.put("titulo", titulo);
        }

        if (descricao != null) {
            wheres.add("descricao = :descricao");
            parameters.put("descricao", descricao);
        }

        if (area != null) {
            wheres.add("area_negocio = :area");
            parameters.put("area", area.ordinal());
        }

        if (escopo != null) {
            wheres.add("escopo = :escopo");
            parameters.put("escopo", escopo.ordinal());
        }

        if (pontuacao != null) {
            wheres.add("pontuacao = :pontuacao");
            parameters.put("pontuacao", pontuacao);
        }

        if (unidade != null) {
            wheres.add("unidade_medida = :unidade");
            parameters.put("unidade", unidade);
        }

        StringBuilder sql = new StringBuilder("select titulo, descricao, area_negocio areaNegocio, escopo, pontuacao, unidade_medida unidadeMedida from movimento");

        if (!parameters.isEmpty()) {
            sql.append(" where ");
            sql.append(String.join(" and ", wheres));
        }

        Query query = sql2o.open().createQuery(sql.toString());
        parameters.forEach(query::addParameter);

        return query.executeAndFetch(Movimento.class);
    }

    public Movimento update(Integer id, String titulo, String descricao, AreaNegocioMovimento area, EscopoMovimento escopo, Integer pontuacao, String unidade) {
        List<String> updates = new ArrayList<>();
        Map<String, Object> parameters = new HashMap<>();

        if (titulo != null) {
            updates.add("titulo = :titulo");
            parameters.put("titulo", titulo);
        }

        if (descricao != null) {
            updates.add("descricao = :descricao");
            parameters.put("descricao", descricao);
        }

        if (area != null) {
            updates.add("area_negocio = :area");
            parameters.put("area", area.ordinal());
        }

        if (escopo != null) {
            updates.add("escopo = :escopo");
            parameters.put("escopo", escopo.ordinal());
        }

        if (pontuacao != null) {
            updates.add("pontuacao = :pontuacao");
            parameters.put("pontuacao", pontuacao);
        }

        if (unidade != null) {
            updates.add("unidade_medida = :unidade");
            parameters.put("unidade", unidade);
        }

        Query query = sql2o.open().createQuery("update movimento set " + String.join(", ", updates) + " where id = :id");
        parameters.forEach(query::addParameter);
        query.addParameter("id", id);

        query.executeUpdate();

        Movimento movimento = new Movimento();
        movimento.setId(id);

        return movimento;
    }

    public void remove(Integer id) {
        String sql = "delete from movimento where id = :id";

        Connection con = sql2o.open();
        con.createQuery(sql).addParameter("id", id).executeUpdate();
    }

    public List<Movimento> findByPessoa(Integer id) {

        Query query = sql2o.open().createQuery(
            "select " +
            "    m.id, m.titulo, m.area_negocio areaNegocio, m.escopo, " +
            "    m.pontuacao, m.unidade_medida unidadeMedida " +
            "from movimento m" +
            "join movimento_pessoa mp" +
            "where mp.id_pessoa = :id"
        ).addParameter("id", id);

        return query.executeAndFetch(Movimento.class);

    }
}
