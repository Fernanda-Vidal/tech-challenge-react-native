import { query } from "../database/database.js";

export const createPostModel = async (titulo, subtitulo, conteudo, idProfessor, idDisciplina, idSubdisciplina) => {
    const sql = 'INSERT INTO postagem (titulo, subtitulo, conteudo, id_professor, id_disciplina, id_subdisciplina) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;';

    const result = await query(sql, [titulo, subtitulo, conteudo, idProfessor, idDisciplina, idSubdisciplina]);
    return result;
};

export const searchPostModel = async (search) => {
    const sql = `
        SELECT p.*, pe.nome as nome_professor, d.nome_disciplina, s.nome_subdisciplina
        FROM postagem p
        INNER JOIN professor pr ON p.id_professor = pr.id_professor
        INNER JOIN pessoa pe ON pr.id_pessoa = pe.id_pessoa
        INNER JOIN disciplina d ON p.id_disciplina = d.id_disciplina
        LEFT JOIN subdisciplina s ON p.id_subdisciplina = s.id_subdisciplina
        WHERE 
            p.titulo ILIKE '%' || $1 || '%' OR
            p.subtitulo ILIKE '%' || $1 || '%' OR
            p.conteudo ILIKE '%' || $1 || '%' OR
            pe.nome ILIKE '%' || $1 || '%' OR
            d.nome_disciplina ILIKE '%' || $1 || '%'
        ORDER BY p.id_postagem DESC;
    `;
    try {
        const result = await query(sql, [search]);
        console.log('result', result);
        return result;
    } catch (err) {
        console.error(`Erro ao buscar postagens: ${err.message}`);
        throw err;
    }
};

export const searchPostByIdModel = async (id) => {
    const sql = `
        SELECT p.*, pe.nome as nome_professor, d.nome_disciplina, s.nome_subdisciplina
        FROM postagem p
        INNER JOIN professor pr ON p.id_professor = pr.id_professor
        INNER JOIN pessoa pe ON pr.id_pessoa = pe.id_pessoa
        INNER JOIN disciplina d ON p.id_disciplina = d.id_disciplina
        LEFT JOIN subdisciplina s ON p.id_subdisciplina = s.id_subdisciplina
        WHERE p.id_postagem = $1;
    `;
    try {
        const result = await query(sql, [id]);
        console.log('result', result);
        return result;
    } catch (err) {
        console.error(`Erro ao buscar postagens por id: ${err.message}`);
        throw err;
    }
};

export const updatePostByIdModel = async (id, titulo, subtitulo, conteudo, idProfessor, idDisciplina, idSubdisciplina) => {
    const sql = `
        UPDATE postagem
        SET titulo = $2,
            subtitulo = $3,
            conteudo = $4,
            id_professor = $5,
            id_disciplina = $6,
            id_subdisciplina = $7
        WHERE id_postagem = $1
        RETURNING *;
    `;
    try {
        const result = await query(sql, [id, titulo, subtitulo, conteudo, idProfessor, idDisciplina, idSubdisciplina]);
        console.log('result', result);
        return result;
    } catch (err) {
        console.error(`Erro ao atualizar postagem por id: ${err.message}`);
        throw err;
    }
};

export const deletePostByIdModel = async (id) => {
    const sql = `delete from postagem
                  WHERE 
                     id_postagem = $1
                  RETURNING *;
    `;
    try {
        const result = await query(sql, [id]);
        console.log('result', result);
        return result;
    } catch (err) {
        console.error(`Erro ao deletar postagens por id: ${err.message}`);
        throw err;
    }

};

export const getAllPostsModel = async () => {
    const sql = `
        SELECT p.*, pe.nome as nome_professor, d.nome_disciplina, s.nome_subdisciplina
        FROM postagem p
        INNER JOIN professor pr ON p.id_professor = pr.id_professor
        INNER JOIN pessoa pe ON pr.id_pessoa = pe.id_pessoa
        INNER JOIN disciplina d ON p.id_disciplina = d.id_disciplina
        LEFT JOIN subdisciplina s ON p.id_subdisciplina = s.id_subdisciplina
        ORDER BY p.id_postagem DESC;
    `;
    try {
        const result = await query(sql);
        return result;
    } catch (err) {
        console.error(`Erro ao listar postagens: ${err.message}`);
        throw err;
    }
};

export const getAllPostsByTeacherModel = async () => {
    const sql = `
        SELECT p.*, pe.nome as nome_professor, d.nome_disciplina, s.nome_subdisciplina
        FROM postagem p
        INNER JOIN professor pr ON p.id_professor = pr.id_professor
        INNER JOIN pessoa pe ON pr.id_pessoa = pe.id_pessoa
        INNER JOIN disciplina d ON p.id_disciplina = d.id_disciplina
        LEFT JOIN subdisciplina s ON p.id_subdisciplina = s.id_subdisciplina
        ORDER BY p.id_postagem DESC;
    `;
    try {
        const result = await query(sql);
        return result;
    } catch (err) {
        console.error(`Erro ao listar postagens com dados do professor: ${err.message}`);
        throw err;
    }
};

