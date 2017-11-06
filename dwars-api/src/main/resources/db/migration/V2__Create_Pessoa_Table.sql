create table pessoa (
    id serial primary key,
    nome varchar(200) not null,
    email varchar(128) not null,

    id_grupo integer references grupo (id)
);
