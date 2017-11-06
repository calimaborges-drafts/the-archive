package es.carlosborg.commons;

import org.apache.commons.io.FileUtils;
import org.junit.Test;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

import static org.junit.Assert.*;

public class DotenvTest {

    @Test
    public void testLoad() throws Exception {
        new Dotenv().load(createFile());
        assertEquals(System.getProperty("TEST"), "foo");
        assertEquals(System.getProperty("OTHER"), "bar");
    }

    private File createFile() throws IOException {
        File envfile = File.createTempFile("dotenv-testing", "", new File(System.getProperty("java.io.tmpdir")));
        FileUtils.writeStringToFile(envfile, "TEST=foo\nOTHER=bar", StandardCharsets.UTF_8);

        return envfile;
    }

}
