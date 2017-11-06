package es.carlosborg.jpatest;

import es.carlosborg.jpatest.jpa.Student;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.util.Date;
import java.util.List;

/**
 * Hello world!
 *
 */
public class App
{

    EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("test");
    EntityManager entityManager = entityManagerFactory.createEntityManager();

    public static void main( String[] args )
    {
        App app = new App();
        app.start();

    }

    public void start() {
        System.out.println( "Hello World!" );
        create();
        select();
        close();
    }

    public void create() {
        begin();
        Student s = new Student();
        s.setNome("Aluno");
        s.setDataCadastro(new Date());
        entityManager.persist(s);
        commit();
    }

    public void select() {
        begin();
        List<Student> listas = entityManager.createQuery(
            "SELECT s FROM Student s"
        ).getResultList();

        for (Student s : listas) {
            System.out.println(s.getNome());
            System.out.println(s.getDataCadastro());
        }
        commit();
    }

    public void close() {
        entityManager.close();
    }

    public void begin() {
        entityManager.getTransaction().begin();
    }

    public void commit() {
        entityManager.getTransaction().commit();
    }
}
