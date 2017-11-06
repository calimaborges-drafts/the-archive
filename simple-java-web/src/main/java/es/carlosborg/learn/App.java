package es.carlosborg.learn;

import spark.Spark;

import static spark.Spark.*;

public class App {

    public static void main( String[] args ) throws Exception {

        String port = System.getenv("PORT");
        if (port == null || port.isEmpty()) {
            port = "8080";
        }

        App app = new App();
        app.start(Integer.parseInt(port), "/webapp");
    }

    public void start(int portNumber, String webAppDirPath)  {
        port(portNumber);
        staticFileLocation(webAppDirPath);

        get("/hello", (req, res) -> "Hello World");

    }

    public void stop() {

        Spark.stop();

    }
}
