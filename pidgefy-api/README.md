# pidgefy-api

Estrutura do Código
-------------------

* Cada pacote indica um módulo da aplicação. Exemplo: `pokemon`, `auth`
* O pacote `commons` possui classes que deveriam ser separadas em módulos reutilizáveis em outros projetos mas que 
  só não foram extraídas ainda por estarem em período de aprimoramento intenso.  
* O pacote `misc` possui classes que podem ser usadas por mais de um módulo porém não são generalizáveis o 
  suficiente para utilização em outros projetos. **Não coloque tudo nesse pacote :-) Obrigado.**
  
Rodando o projeto
-----------------

```
$ git clone <project_git>
$ cd <project_name>
$ mvn install
$ java -jar target/pidgefy-api.jar
```
