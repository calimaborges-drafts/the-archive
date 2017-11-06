dwars
=====

[![Build Status](https://travis-ci.org/dwars-tst/dwars-api.svg?branch=master)](https://travis-ci.org/dwars-tst/dwars-api)

Estrutura do Código
-------------------

* Cada pacote indica um módulo da aplicação. Exemplo: `grupo`, `pessoa`
* O pacote `commons` possui classes que deveriam ser separadas em módulos reutilizáveis em outros projetos mas que 
  só não foram extraídas ainda por estarem em período de aprimoramento intenso.  
* O pacote `misc` possui classes que podem ser usadas por mais de um módulo porém não são generalizáveis o suficiente para utilização em outros projetos. **Não coloque tudo nesse pacote :-) Obrigado.**


Rodando o projeto
-----------------

```
$ git clone <project_git>
$ cd <project_name>
$ mvn install
$ java -jar target/dwars-app-jar-with-dependencies.jar
```

Entidades
---------

### Grupo ###

#### Rotas ####

    GET     /grupos
    POST    /grupo
    PUT     /grupo/:id
    DELETE  /grupo/:id

#### Campos ####

    nome


### Pessoa ####

#### Rotas ####

    GET     /pessoas
    POST    /pessoa
    PUT     /pessoa/:id
    DELETE  /pessoa/:id

#### Campos ####

    id_grupo
    nome_completo
    email


### Movimento ###

#### Rotas ####

    GET     /movimentos
    POST    /movimento      # requer role administrativa
    PUT     /movimento/:id   # requer role administrativa
    DELETE  /movimento      # requer role administrativa

#### Campos ####

    titulo
    descricao
    negocio_relacionado
    valido_para
    valor
    unidade_medida
    tipo


### Objetivo ###

#### Rotas ####

    GET     /objetivos
    POST    /objetivo       # requer role administrativa
    PUT     /objetivo       # requer role administrativa
    DELETE  /objetivo       # requer role administrativa

#### Campos ####

    titulo
    descricao


Relações
--------

### Grupo -1:N- Pessoa ###

    GET     /grupo/:id/pessoas

### Pessoa -N:N- Movimento ###

    POST    /pessoa/:idPessoa/movimento/:idMovimento
    GET     /pessoa/:id/movimentos
    DELETE  /pessoa/:idPessoa/movimento/:idMovimento

### Grupo -N:N- Movimento ###

    POST    /grupo/:idGrupo/movimento/:idMovimento
    GET     /grupo/:idGrupo/movimentos
    DELETE  /grupo/:idGrupo/movimento/:idMovimento


Proposta Generalização
------------------

### To Do

* Criar resource controller recebe (RepositoryInterface : create, retrieve, update, delete). 
  Deve usar generics para obter tipo da classe. Deve receber Json Transformer (gson, por enquanto) 
  Método para gerar rotas
  Testar bem o controller



### Route

```
import static es.carlosborg.commons.sparkatus.*

resource("resource", Class<T>);
resource("resource", ResourceControllerInterface);

C    POST    /resource
R    GET     /resource
U    PUT     /resource/:id
D    DELETE  /resource/:id
```

### Controller

```
ResourceController(Class<T>)
ResourceController(ResourceRepositoryInterface)

C    - Resource         create   (Request, Response)
R    - List<Resource>   retrieve (Request, Response)
U    - Resource         update   (Request, Response)
D    - void             delete   (Request, Response)
    
```

### Repository

```
ResourceRepository(Class<T>)

C    - Resource          create      (Resource)
R    - List<Resource>    retrieve    ()
U    - Resource          update      (Resource)
D    - void              delete      ()
```

