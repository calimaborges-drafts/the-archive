package es.carlosborg.learn;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class HelloWorldTest {

    protected static App app;

    @BeforeClass
    public static void setUp() throws Exception {
        app = new App();
        app.start(1337, "/webapp");
    }

    @AfterClass
    public static void tearDown() throws Exception {
        app.stop();
    }

    @Test
    public void testHelloWorld() throws UnirestException {
        HttpResponse<String> output = Unirest.get("http://localhost:1337/hello").asString();
        assertEquals(output.getBody(), "Hello World");
    }

    @Test
    public void testIndex() throws UnirestException {
        HttpResponse<String> output = Unirest.get("http://localhost:1337").asString();
        assertTrue(output.getBody().contains("Hello World"));
    }

}
