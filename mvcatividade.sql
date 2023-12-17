CREATE DATABASE bd;
USE bd;

CREATE TABLE usuario (
  id_usuario int unsigned NOT NULL AUTO_INCREMENT,
  nome varchar(45) NOT NULL,
  email varchar(60) NOT NULL,
  senha varchar(60) NOT NULL,
  imagem varchar(60) NOT NULL,
  PRIMARY KEY (id_usuario),
  UNIQUE KEY id_usuario_UNIQUE (id_usuario)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

INSERT INTO usuario (nome, email, senha)
VALUES ('Carlos','teste', 'batata');

INSERT INTO usuario (nome, email, senha)
VALUES ('Pedro','carlos', '123');

INSERT INTO usuario (nome, email, senha)
VALUES ('Catata','jorge', 'bola');

select * from usuario;

CREATE TABLE tarefa (
  id_tarefa int unsigned NOT NULL AUTO_INCREMENT,
  title varchar(45) NOT NULL,
  description tinytext NOT NULL,
  status char(1) NOT NULL DEFAULT 'P',
  usuario_id_usuario int unsigned NOT NULL,
  PRIMARY KEY (id_tarefa),
  UNIQUE KEY id_tarefa_UNIQUE (id_tarefa),
  KEY fk_tarefa_usuario_id_usuario_idx (usuario_id_usuario),
  CONSTRAINT fk_tarefa_usuario_id_usuario FOREIGN KEY (usuario_id_usuario) REFERENCES usuario (id_usuario)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=armscii8;

INSERT INTO tarefa (title, description, status,usuario_id_usuario)
VALUES ('Comprar Cafe', 'Comprar 3 Kg de cafe', true, 3);

INSERT INTO tarefa (title, description, status,usuario_id_usuario)
VALUES ('Beber cafe', 'Beber o cafe', true, 2);

INSERT INTO tarefa (title, description, status,usuario_id_usuario)
VALUES ('Correr', 'Correr na rua', true, 4);

INSERT INTO tarefa (title, description, status,usuario_id_usuario)
VALUES ('lançar o passinho', 'passinho', true, 4);

select * from tarefa WHERE usuario_id_usuario=4 AND description='passinho';

drop database bd;