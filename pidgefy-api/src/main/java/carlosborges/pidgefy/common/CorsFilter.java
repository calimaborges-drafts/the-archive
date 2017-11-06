package carlosborges.pidgefy.common;

import spark.Request;
import spark.Response;

public class CorsFilter {

    public void filter(Request req, Response res) {
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type,Authorization,X-Requested-With,Content-Length,Accept,Origin,Token,token");
        res.header("Access-Control-Allow-Credentials", "true");
    }

}
