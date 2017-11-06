package es.carlosborg.commons;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Map.Entry;
import java.util.Properties;

public final class Dotenv {

    public void load(File env) throws IOException {
        if (!env.exists()) return;

        Properties variables = new Properties();
        variables.load(new FileInputStream(env));
        for (Entry<Object, Object> variable : variables.entrySet()) {
            System.out.println("Loaded " + variable.getKey().toString());
            System.setProperty(
                variable.getKey().toString(),
                variable.getValue().toString()
            );
        }
    }
}
