package carlosborges.pidgefy.pokemon;

import POGOProtos.Enums.PokemonFamilyIdOuterClass;
import carlosborges.pidgefy.misc.Factory;
import com.google.gson.Gson;
import com.pokegoapi.api.inventory.PokeBank;
import com.pokegoapi.api.pokemon.Pokemon;
import com.pokegoapi.exceptions.LoginFailedException;
import com.pokegoapi.exceptions.RemoteServerException;
import com.pokegoapi.util.PokeNames;
import spark.Request;
import spark.Response;

import java.util.*;

public class PokemonController {

    private final transient Gson gson;

    public PokemonController(Gson gson) {
        this.gson = gson;
    }

    public String get(Request req, Response res) throws LoginFailedException, RemoteServerException {
        Factory factory = new Factory(req, res);

        PokeBank pokeBank = factory.pokemonGo().getInventories().getPokebank();

        Map<PokemonFamilyIdOuterClass.PokemonFamilyId, List<PokemonResponse>> pokemonsPerFamily = new HashMap<>();
        for (Pokemon pokemon : pokeBank.getPokemons()) {
            PokemonResponse pokemonResponse = new PokemonResponse();
            pokemonResponse.idFamilia = pokemon.getPokemonFamily().getNumber();
            pokemonResponse.familia = PokeNames.getDisplayName(pokemonResponse.idFamilia, Locale.ENGLISH);

            if (!pokemonsPerFamily.containsKey(pokemon.getPokemonFamily())) {
                pokemonsPerFamily.put(pokemon.getPokemonFamily(), new ArrayList<>());
            }

            pokemonsPerFamily.get(pokemon.getPokemonFamily()).add(pokemonResponse);
        }

        res.type("application/json");
        return gson.toJson(pokemonsPerFamily);
    }

}
