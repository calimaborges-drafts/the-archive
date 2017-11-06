package es.carlosborg.objetivo;

import org.sql2o.Connection;
import org.sql2o.Query;
import org.sql2o.Sql2o;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ObjetivoRepository {

    private transient final Sql2o sql2o;

    public ObjetivoRepository(Sql2o sql2o) {
        this.sql2o = sql2o;
    }

    public Objetivo add(String titulo, String descricao) {
        String sql = "insert into objetivo(titulo, descricao) values(:titulo, :descricao)";

        Connection con = sql2o.open();
        Integer id = (Integer) con.createQuery(sql, true)
            .addParameter("titulo", titulo)
            .addParameter("descricao", descricao)
            .executeUpdate()
            .getKey();

        Objetivo objetivo = new Objetivo();
        objetivo.setId(id);

        return objetivo;
    }

    public Objetivo add(Objetivo objetivo) {
        return add(objetivo.getTitulo(), objetivo.getDescricao());
    }

    public List<Objetivo> find(String titulo, String descricao) {
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

        StringBuilder sql = new StringBuilder("select titulo, descricao from objetivo");

        if (!parameters.isEmpty()) {
            sql.append(" where ");
            sql.append(String.join(" and ", wheres));
        }

        Query query = sql2o.open().createQuery(sql.toString());
        parameters.forEach(query::addParameter);

        return query.executeAndFetch(Objetivo.class);
    }

    public List<Objetivo> all() {
        return find(null, null);
    }

    public Objetivo update(Integer id, String titulo, String descricao) {
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

        Query query = sql2o.open().createQuery("update objetivo set " + String.join(", ", updates) + " where id = :id");
        parameters.forEach(query::addParameter);
        query.addParameter("id", id);

        query.executeUpdate();

        Objetivo objetivo = new Objetivo();
        objetivo.setId(id);

        return objetivo;
    }

    public void remove(Integer id) {
        String sql = "delete from objetivo where id = :id";

        Connection con = sql2o.open();
        con.createQuery(sql).addParameter("id", id).executeUpdate();
    }
}
