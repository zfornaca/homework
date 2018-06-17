DROP DATABASE IF EXISTS  aggregates_exercise;

CREATE DATABASE aggregates_exercise;

\c aggregates_exercise

CREATE TABLE snacks (
  id SERIAL PRIMARY KEY,
  name TEXT,
  kind TEXT,
  calories INTEGER,
  price NUMERIC
);

INSERT INTO snacks
  (name, kind, calories, price)
VALUES
  ('snickers', 'candy bar', 300, 2.99),
  ('cupcakes', 'baked goods', 260, 2.49),
  ('cake', 'baked goods', 400, 3.99),
  ('potato chips', 'chips', 500, 4.99),
  ('milky way', 'candy bar', 220, 7.99),
  ('cheetos', 'chips', 250, 11.99),
  ('chocolate chip cookie', 'baked goods', 290, 2.89),
  ('3 musketeers', 'candy bar', 230, 1.99),
  ('cheese its', 'chips', 100, 0.99),
  ('funions', 'chips', 280, 2.39),
  ('fig newtons', 'baked goods', 240, 3.99),
  ('fruit roolup', 'fruit snack', 420, 5.39),
  ('gushers', 'fruit snack', 220, 3.38),
  ('gogurt', 'yogurt', 260, 5.32),
  ('capri sun', 'beverage', 300, 1.49),
  ('sunny D', 'beverage', 120, 3.99),
  ('ice cream', 'frozen', 2000, 5.29),
  ('rice krispies', 'baked goods', 300, 1.99),
  ('pringles', 'chips', 400, 2.39),
  ('twix', 'candy bar', 450, 2.90),
  ('payday', 'candy bar', 500, 2.39);