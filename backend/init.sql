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

-- Inserção de dados
INSERT INTO disciplina(id_disciplina, nome_disciplina)
VALUES
    (1, 'portugues');

INSERT INTO subdisciplina(id_subdisciplina, nome_subdisciplina)
VALUES
    (1, 'literatura');

-- Inserção de pessoas
INSERT INTO pessoa (nome, email, senha, role)
VALUES
    ('Fernanda', 'fernanda@escola.com', '123456', 'professor'),
    ('Adriana Calcanhoto', 'adriana@escola.com', '123456', 'aluno'),
    ('Bruno Mars', 'bruno@escola.com', '123456', 'aluno'),
    ('Coralie Barbier', 'coralie@escola.com', '123456', 'aluno'),
    ('Admin', 'admin@escola.com', '123456', 'administrativo');

-- Inserção de professor relacionado à pessoa
INSERT INTO professor(id_professor, id_pessoa, id_disciplina, id_subdisciplina)
VALUES
    (1, 1, 1, 1);

INSERT INTO turma (nome_turma, serie_turma)
VALUES
    ('A', '6'),
    ('B', '7'),
    ('C', '8'),
    ('D', '9');

-- Inserção de alunos relacionados às pessoas
INSERT INTO aluno (id_pessoa, id_turma)
VALUES
    (2, 1),
    (3, 1),
    (4, 1);

-- Inserção do administrador
INSERT INTO administracao (id_pessoa, cod_funcional)
VALUES
    (5, 'ADM001');
