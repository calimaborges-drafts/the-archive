package es.carlosborg.movimento;

public class Movimento {
    private Integer id;
    private String titulo;
    private String descricao;
    private AreaNegocioMovimento areaNegocio;
    private EscopoMovimento escopo;
    private Integer pontuacao;
    private String unidadeMedida;

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getTitulo() {
        return titulo;
    }
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }
    public String getDescricao() {
        return descricao;
    }
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
    public AreaNegocioMovimento getAreaNegocio() {
        return areaNegocio;
    }
    public void setAreaNegocio(AreaNegocioMovimento areaNegocio) {
        this.areaNegocio = areaNegocio;
    }
    public EscopoMovimento getEscopo() {
        return escopo;
    }
    public void setEscopo(EscopoMovimento escopo) {
        this.escopo = escopo;
    }
    public Integer getPontuacao() {
        return pontuacao;
    }
    public void setPontuacao(Integer pontuacao) {
        this.pontuacao = pontuacao;
    }
    public String getUnidadeMedida() {
        return unidadeMedida;
    }
    public void setUnidadeMedida(String unidadeMedida) {
        this.unidadeMedida = unidadeMedida;
    }
}
