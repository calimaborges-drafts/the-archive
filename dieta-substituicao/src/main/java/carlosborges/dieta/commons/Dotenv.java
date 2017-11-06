package carlosborges.dieta.commons;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public final class Dotenv {

    private static final transient Logger logger = LoggerFactory.getLogger(Dotenv.class);


    public void load(File env) throws IOException {
        loadFromEnv();
        loadFromFile(env);
    }

    public void loadFromFile(File env) throws IOException {
        if (!env.exists()) return;

        Properties variables = new Properties();
        variables.load(new FileInputStream(env));
        variables.forEach(this::setProperty);
    }

    public void loadFromEnv() {
        System.getenv().forEach( this::setProperty );
    }

    private void setProperty(Object key, Object value) {
        logger.info("Loaded " + key.toString());
        System.setProperty(key.toString(), value.toString());
    }
}
