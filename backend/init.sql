-- Limpar e reiniciar as sequences
DROP TABLE IF EXISTS postagem;
DROP TABLE IF EXISTS administracao;
DROP TABLE IF EXISTS aluno;
DROP TABLE IF EXISTS professor;
DROP TABLE IF EXISTS pessoa;
DROP TABLE IF EXISTS turma;
DROP TABLE IF EXISTS subdisciplina;
DROP TABLE IF EXISTS disciplina;

-- Criação das tabelas
CREATE TABLE IF NOT EXISTS pessoa (
    id_pessoa SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('aluno', 'professor', 'administrativo'))
);

CREATE TABLE IF NOT EXISTS disciplina(
    id_disciplina SERIAL PRIMARY KEY,
    nome_disciplina VARCHAR(30) NOT NULL  
);

CREATE TABLE IF NOT EXISTS subdisciplina(
    id_subdisciplina SERIAL PRIMARY KEY,
    nome_subdisciplina VARCHAR(100) NOT NULL  
);

CREATE TABLE IF NOT EXISTS professor(
    id_professor SERIAL PRIMARY KEY,
    id_pessoa INT NOT NULL,
    id_disciplina INT NOT NULL,
    id_subdisciplina INT,
    FOREIGN KEY (id_pessoa) REFERENCES pessoa(id_pessoa),
    FOREIGN KEY (id_disciplina) REFERENCES disciplina(id_disciplina),
    FOREIGN KEY (id_subdisciplina) REFERENCES subdisciplina(id_subdisciplina)
);

CREATE TABLE IF NOT EXISTS turma (
    id_turma SERIAL PRIMARY KEY, 
    nome_turma VARCHAR(6) NOT NULL,
    serie_turma VARCHAR(1)
);

CREATE TABLE IF NOT EXISTS aluno (
    id_aluno SERIAL PRIMARY KEY,
    id_pessoa INT NOT NULL,
    id_turma INT NOT NULL,
    FOREIGN KEY (id_pessoa) REFERENCES pessoa(id_pessoa),
    FOREIGN KEY (id_turma) REFERENCES turma(id_turma)
);

CREATE TABLE IF NOT EXISTS administracao(
    id_adm SERIAL PRIMARY KEY,
    id_pessoa INT NOT NULL,
    cod_funcional VARCHAR(10) NOT NULL,
    FOREIGN KEY (id_pessoa) REFERENCES pessoa(id_pessoa)
);

CREATE TABLE IF NOT EXISTS postagem(
    id_postagem SERIAL PRIMARY KEY, 
    titulo VARCHAR(200) NOT NULL,
    subtitulo VARCHAR(200),
    conteudo TEXT NOT NULL,
    id_professor INT NOT NULL,
    id_disciplina INT NOT NULL,
    id_subdisciplina INT,
    FOREIGN KEY (id_professor) REFERENCES professor(id_professor),
    FOREIGN KEY (id_disciplina) REFERENCES disciplina(id_disciplina),
    FOREIGN KEY (id_subdisciplina) REFERENCES subdisciplina(id_subdisciplina)
);

-- Resetar as sequences
ALTER SEQUENCE pessoa_id_pessoa_seq RESTART WITH 1;
ALTER SEQUENCE disciplina_id_disciplina_seq RESTART WITH 1;
ALTER SEQUENCE subdisciplina_id_subdisciplina_seq RESTART WITH 1;
ALTER SEQUENCE professor_id_professor_seq RESTART WITH 1;
ALTER SEQUENCE turma_id_turma_seq RESTART WITH 1;
ALTER SEQUENCE aluno_id_aluno_seq RESTART WITH 1;
ALTER SEQUENCE administracao_id_adm_seq RESTART WITH 1;
ALTER SEQUENCE postagem_id_postagem_seq RESTART WITH 1;

-- Inserção de dados
INSERT INTO disciplina(id_disciplina, nome_disciplina)
VALUES
    (1, 'portugues');

INSERT INTO subdisciplina(id_subdisciplina, nome_subdisciplina)
VALUES
    (1, 'literatura');

-- Inserção de pessoas
INSERT INTO pessoa (id_pessoa, nome, email, senha, role)
VALUES
    (1, 'Fernanda', 'fernanda@escola.com', '123456', 'professor'),
    (2, 'Adriana Calcanhoto', 'adriana@escola.com', '123456', 'aluno'),
    (3, 'Bruno Mars', 'bruno@escola.com', '123456', 'aluno'),
    (4, 'Coralie Barbier', 'coralie@escola.com', '123456', 'aluno'),
    (5, 'Admin', 'admin@escola.com', '123456', 'administrativo');

-- Inserção de professor relacionado à pessoa
INSERT INTO professor(id_professor, id_pessoa, id_disciplina, id_subdisciplina)
VALUES
    (1, 1, 1, 1);

INSERT INTO turma (id_turma, nome_turma, serie_turma)
VALUES
    (1, 'A', '6'),
    (2, 'B', '7'),
    (3, 'C', '8'),
    (4, 'D', '9');

-- Inserção de alunos relacionados às pessoas
INSERT INTO aluno (id_aluno, id_pessoa, id_turma)
VALUES
    (1, 2, 1),
    (2, 3, 1),
    (3, 4, 1);

-- Inserção do administrador
INSERT INTO administracao (id_adm, id_pessoa, cod_funcional)
VALUES
    (1, 5, 'ADM001');
