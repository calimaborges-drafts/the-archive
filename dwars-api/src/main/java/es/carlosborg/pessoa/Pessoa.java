package es.carlosborg.pessoa;

public class Pessoa {
    private Integer id;
    private String nome;
    private String email;
    private Integer idGrupo;

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public Integer getIdGrupo() {
        return idGrupo;
    }
    public void setIdGrupo(Integer idGrupo) {
        this.idGrupo = idGrupo;
    }
}
