create table food (
  uuid serial primary key,
  name text not null,
  unit text,
  amount_unit float,
  amount_gram float,
  amount_calories float,
  description text,
  uuid_food_group varchar(32) references food_group(uuid)
);
