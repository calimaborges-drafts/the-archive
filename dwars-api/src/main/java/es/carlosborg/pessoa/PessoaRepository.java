package es.carlosborg.pessoa;

import org.sql2o.Connection;
import org.sql2o.Query;
import org.sql2o.Sql2o;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PessoaRepository {

    private transient final Sql2o sql2o;

    public PessoaRepository(Sql2o sql2o) {
        this.sql2o = sql2o;
    }

    public Pessoa add(String nome, String email, Integer idGrupo) {
        String sql = "insert into pessoa(nome, email, id_grupo) values(:nome, :email, :grupo)";

        Connection con = sql2o.open();
        Integer id = (Integer) con.createQuery(sql, true)
            .addParameter("nome", nome)
            .addParameter("email", email)
            .addParameter("grupo", idGrupo)
            .executeUpdate()
            .getKey();

        Pessoa pessoa = new Pessoa();
        pessoa.setId(id);

        return pessoa;
    }

    public Pessoa add(Pessoa pessoa) {

        return add(pessoa.getNome(), pessoa.getEmail(), pessoa.getIdGrupo());

    }

    public List<Pessoa> all() {
        return find(null, null, null);
    }

    public List<Pessoa> find(String nome, String email, Integer idGrupo) {
        List<String> wheres = new ArrayList<>();
        Map<String, Object> parameters = new HashMap<>();

        if (nome != null) {
            wheres.add("nome = :nome");
            parameters.put("nome", nome);
        }

        if (email != null) {
            wheres.add("email = :email");
            parameters.put("email", email);
        }

        if (idGrupo != null) {
            wheres.add("id_grupo = :grupo");
            parameters.put("grupo", idGrupo);
        }

        StringBuilder sql = new StringBuilder("select nome, email, id_grupo idGrupo from pessoa");

        if (!parameters.isEmpty()) {
            sql.append(" where ");
            sql.append(String.join(" and ", wheres));
        }

        Query query = sql2o.open().createQuery(sql.toString());
        parameters.forEach(query::addParameter);

        return query.executeAndFetch(Pessoa.class);
    }

    public Pessoa update(Integer id, String nome, String email, Integer grupo) {
        List<String> updates = new ArrayList<>();
        Map<String, Object> parameters = new HashMap<>();

        if (nome != null) {
            updates.add("nome = :nome");
            parameters.put("nome", nome);
        }

        if (email != null) {
            updates.add("email = :email");
            parameters.put("email", email);
        }

        if (grupo != null) {
            updates.add("id_grupo = :grupo");
            parameters.put("grupo", grupo);
        }

        //FIXME: E se todos forem nulos? Fazer o teste para isso para todos os updates

        Query query = sql2o.open().createQuery("update pessoa set " + String.join(", ", updates) + " where id = :id");
        parameters.forEach(query::addParameter);
        query.addParameter("id", id);

        query.executeUpdate();

        Pessoa pessoa = new Pessoa();
        pessoa.setId(id);

        return pessoa;
    }

    public void remove(Integer id) {
        String sql = "delete from pessoa where id = :id";

        Connection con = sql2o.open();
        con.createQuery(sql).addParameter("id", id).executeUpdate();
    }
}
