import { query } from "../database/database.js";

export const getUserModel = async () => {
    const sql = 'SELECT * FROM aluno;';
    const result = await query(sql);
    return result;
};

export default { getUserModel };