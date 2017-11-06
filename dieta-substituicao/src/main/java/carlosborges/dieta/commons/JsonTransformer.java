package carlosborges.dieta.commons;

import com.google.gson.Gson;
import spark.ResponseTransformer;

public class JsonTransformer implements ResponseTransformer {

    private final transient Gson gson;

    public JsonTransformer(Gson gson) {
        this.gson = gson;
    }

    public String render(Object response) {
        return gson.toJson(response);
    }
}
