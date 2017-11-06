package carlosborges.pidgefy.misc;

import com.pokegoapi.api.PokemonGo;
import com.pokegoapi.auth.GoogleUserCredentialProvider;
import com.pokegoapi.exceptions.LoginFailedException;
import com.pokegoapi.exceptions.RemoteServerException;
import okhttp3.OkHttpClient;
import spark.Request;
import spark.Response;

public class Factory {

    private final transient Request req;
    private final transient Response res;

    private OkHttpClient httpClient;
    private PokemonGo pokemonGo;
    private String token;

    public Factory(Request req, Response res) {
        this.req = req;
        this.res = res;
    }

    public PokemonGo pokemonGo() throws LoginFailedException, RemoteServerException {
        if (pokemonGo == null) {
            pokemonGo = new PokemonGo(new GoogleUserCredentialProvider(httpClient(), token()), httpClient);
        }

        return pokemonGo;
    }

    public OkHttpClient httpClient() {
        if (httpClient == null) {
            httpClient = new OkHttpClient();
        }

        return httpClient;
    }

    public String token() {
        if (token == null) {
            token = req.headers("token");
        }

        return token;
    }
}
