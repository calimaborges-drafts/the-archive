create table movimento (
    id serial primary key,
    titulo varchar(200) not null,
    descricao text,
    area_negocio integer not null,
    escopo integer not null,
    pontuacao integer not null,
    unidade_medida varchar(64)
);
