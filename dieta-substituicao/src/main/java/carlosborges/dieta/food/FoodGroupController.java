package carlosborges.dieta.food;

import com.google.common.net.MediaType;
import org.eclipse.jetty.http.HttpStatus;
import org.sql2o.Connection;
import org.sql2o.Sql2o;
import spark.Request;
import spark.Response;

import java.util.List;

public class FoodGroupController {

    private transient final Sql2o sql2o;

    public FoodGroupController(Sql2o sql2o) {
        this.sql2o = sql2o;
    }

    public List<FoodGroup> retrieve(Request req, Response res) {
        Connection conn = sql2o.open();
        List<FoodGroup> foodGroups = conn.createQuery("select * from food_group").executeAndFetch(FoodGroup.class);
        conn.close();

        res.status(HttpStatus.OK_200);
        res.type(MediaType.JSON_UTF_8.toString());
        return foodGroups;
    }
}
