package es.carlosborg.commons.database;

import org.flywaydb.core.Flyway;
import org.sql2o.Connection;
import org.sql2o.Sql2o;

public class DatabaseManager {

    private transient final Sql2o sql2o;

    public DatabaseManager(Sql2o sql2o) {
        this.sql2o = sql2o;
    }

    private void initialize() {
        Flyway flyway = new Flyway();
        flyway.setDataSource(sql2o.getDataSource());
        flyway.migrate();
    }

    private void cleanup() {
        try(Connection con = sql2o.open()) {
            String sql = "DROP ALL OBJECTS";
            con.createQuery(sql).executeUpdate();
        }
    }

    public void recreate() {
        this.cleanup();
        this.initialize();
    }

}
