import { query } from '../database/database.js';

export const validateUser = async (email, senha, userType) => {
    try {
        // Credenciais hardcoded para teste
        const users = {
            professor: {
                email: 'fernanda@escola.com',
                senha: '123456',
                id_pessoa: 1,
                nome: 'Fernanda',
                role: 'professor',
                id_professor: 1
            },
            admin: {
                email: 'admin@escola.com',
                senha: '123456',
                id_pessoa: 2,
                nome: 'Admin',
                role: 'administrativo',
                id_adm: 1,
                cod_funcional: 'ADM001'
            }
        };

        // Verifica se é professor ou admin
        const userRole = userType === 'admin' ? 'admin' : 'professor';
        const userData = users[userRole];

        if (!userData || email !== userData.email || senha !== userData.senha) {
            console.log('Credenciais inválidas');
            return null;
        }

        console.log('Usuário autenticado:', userData);
        return userData;
    } catch (error) {
        console.error('Erro na validação:', error);
        throw error;
    }
}; 