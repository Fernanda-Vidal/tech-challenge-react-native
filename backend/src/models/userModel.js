import { query } from "../database/database.js";

export const getUserModel = async () => {
    const sql = 'SELECT p.*, a.id_aluno, a.id_turma FROM pessoa p LEFT JOIN aluno a ON p.id_pessoa = a.id_pessoa WHERE p.role = \'aluno\';';
    const result = await query(sql);
    return result;
};

export const createUserModel = async (userData) => {
    const { nome, email, senha, tipo } = userData;
    
    // Primeiro, inserir na tabela pessoa
    const insertPessoaSQL = `INSERT INTO pessoa (nome, email, senha, role) VALUES ($1, $2, $3, $4) RETURNING *`;
    const pessoaValues = [nome, email, senha, tipo];
    
    const pessoaResult = await query(insertPessoaSQL, pessoaValues);
    const pessoaId = pessoaResult.rows[0].id_pessoa;

    // Depois, inserir na tabela específica (professor ou aluno)
    if (tipo === 'professor') {
        // Por padrão, vamos associar à primeira disciplina (id_disciplina = 1)
        const insertProfessorSQL = `INSERT INTO professor (id_pessoa, id_disciplina) VALUES ($1, 1) RETURNING *`;
        await query(insertProfessorSQL, [pessoaId]);
    } else if (tipo === 'aluno') {
        // Por padrão, vamos associar à primeira turma (id_turma = 1)
        const insertAlunoSQL = `INSERT INTO aluno (id_pessoa, id_turma) VALUES ($1, 1) RETURNING *`;
        await query(insertAlunoSQL, [pessoaId]);
    }

    return pessoaResult.rows[0];
};

export const getUserByRoleModel = async (role) => {
    let sql;
    if (role === 'professor') {
        sql = 'SELECT p.*, pr.id_professor, pr.id_disciplina FROM pessoa p LEFT JOIN professor pr ON p.id_pessoa = pr.id_pessoa WHERE p.role = $1;';
    } else if (role === 'aluno') {
        sql = 'SELECT p.*, a.id_aluno, a.id_turma FROM pessoa p LEFT JOIN aluno a ON p.id_pessoa = a.id_pessoa WHERE p.role = $1;';
    } else {
        sql = 'SELECT * FROM pessoa WHERE role = $1;';
    }
    const result = await query(sql, [role]);
    return result.rows;
};

export default { getUserModel, createUserModel, getUserByRoleModel };