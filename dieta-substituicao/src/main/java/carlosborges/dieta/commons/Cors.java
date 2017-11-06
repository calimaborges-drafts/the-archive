package carlosborges.dieta.commons;

import spark.Response;

public class Cors {

    public String applyCors(Response res) {
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS,PATCH");
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type,Authorization,X-Requested-With,Content-Length,Accept,Origin,");
        res.header("Access-Control-Allow-Credentials", "true");

        return "OK";
    }

}
