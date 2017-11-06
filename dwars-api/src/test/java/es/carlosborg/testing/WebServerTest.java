package es.carlosborg.testing;


import es.carlosborg.App;
import es.carlosborg.commons.database.DatabaseManager;
import es.carlosborg.grupo.GrupoRepository;
import es.carlosborg.movimento.MovimentoRepository;
import es.carlosborg.objetivo.ObjetivoRepository;
import es.carlosborg.pessoa.PessoaRepository;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.sql2o.Sql2o;

@SuppressWarnings("WeakerAccess")
public class WebServerTest {

    protected final static String kPort = "1337";
    protected final static String kBaseUrl = "http://localhost:" + kPort;

    protected final static String kDbUrl = "jdbc:h2:mem:dbtest;DB_CLOSE_DELAY=-1";

    protected static App app;
    protected static Sql2o sql2o;
    protected static DatabaseManager dbManager;
    protected static PessoaRepository pessoaRepository;
    protected static GrupoRepository grupoRepository;
    protected static MovimentoRepository movimentoRepository;
    protected static ObjetivoRepository objetivoRepository;
    protected static Gerador gerar;

    @BeforeClass
    public static void setUp() {
        app = new App();
        app.start(kPort, kDbUrl);
        sql2o = app.getSql2oInstance();
        dbManager = new DatabaseManager(sql2o);
        pessoaRepository = new PessoaRepository(sql2o);
        grupoRepository = new GrupoRepository(sql2o);
        movimentoRepository  = new MovimentoRepository(sql2o);
        objetivoRepository = new ObjetivoRepository(sql2o);
        gerar = new Gerador();
    }

    @AfterClass
    public static void tearDown() {
        app.end();
    }

    @Before
    public void initialize() {
        dbManager.recreate();
    }
}
