package es.carlosborg.grupo;

import org.sql2o.Connection;
import org.sql2o.Query;
import org.sql2o.Sql2o;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GrupoRepository {

    private transient final Sql2o sql2o;

    public GrupoRepository(Sql2o sql2o) {
        this.sql2o = sql2o;
    }

    public Grupo add(String nome) {
        String sql = "insert into grupo(nome) values(:nome)";

        Connection con = sql2o.open();
        Integer id = (Integer) con.createQuery(sql, true)
            .addParameter("nome", nome)
            .executeUpdate()
            .getKey();

        Grupo grupo = new Grupo();
        grupo.setId(id);

        return grupo;
    }

    public Grupo add(Grupo grupo) {
        return add(grupo.getNome());
    }

    public List<Grupo> all() {
        return find(null);
    }

    public List<Grupo> find(String nome) {
        List<String> wheres = new ArrayList<>();
        Map<String, Object> parameters = new HashMap<>();

        if (nome != null) {
            wheres.add("nome = :nome");
            parameters.put("nome", nome);
        }

        StringBuilder sql = new StringBuilder("select nome from grupo");

        if (!parameters.isEmpty()) {
            sql.append(" where ");
            sql.append(String.join(" and ", wheres));
        }

        Query query = sql2o.open().createQuery(sql.toString());
        parameters.forEach(query::addParameter);

        return query.executeAndFetch(Grupo.class);
    }

    public Grupo update(Integer id, String nome) {
        String sql = "update grupo set nome = :nome where id = :id";

        Connection con = sql2o.open();
        con.createQuery(sql).addParameter("nome", nome).addParameter("id", id).executeUpdate();

        Grupo grupo = new Grupo();
        grupo.setId(id);

        return grupo;
    }

    public void remove(Integer id) {
        String sql = "delete from grupo where id = :id";

        Connection con = sql2o.open();
        con.createQuery(sql).addParameter("id", id).executeUpdate();
    }

}
