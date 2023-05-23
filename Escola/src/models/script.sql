CREATE DATABASE escola;
USE escola;

CREATE TABLE turma(
	id_turma INT NOT NULL AUTO_INCREMENT primary key,
    descricao varchar(50),
    createdAt datetime,
    updatedAt datetime
    );
    
    CREATE TABLE aluno(
		id_aluno INT NOT NULL AUTO_INCREMENT primary key,
        matricula INTEGER,
        nome VARCHAR(100),
        fk_turma INT,
        createdAt DATETIME,
        updatedAt DATETIME,
        INDEX aluno_FKIndex1(fk_turma),
        FOREIGN KEY(fk_turma) REFERENCES turma(id_turma)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
	);
    
INSERT INTO turma VALUES(default, "Informática", now(), now());
INSERT INTO turma VALUES(default, "Recursos Humanos",now(), now());
insert into aluno values(default, 04453,'Jose', 1, now(), now());
insert into aluno values(default, 04454,'Matheus', 2, now(), now());
insert into aluno values(default, 04455,'Guilherme', 1, now(), now());
insert into aluno values(default, 04456,'Gael', 2, now(), now());

select * from turma;
select * from aluno;

select a.id_aluno as id_aluno, a.matricula as matricula, a.nome as nome,
t.descricao from aluno as a inner join turma as t on 
a.fk_turma=t.id_turma;

create view selecAluno as select a.id_aluno as id_aluno, a.matricula as
matricula, a.nome as nome, t.descricao from aluno as a inner join turma
as t on a.fk_turma=t.id_turma;

select * from selecAluno;