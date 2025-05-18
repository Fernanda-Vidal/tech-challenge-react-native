import { getUserModel, createUserModel, getUserByRoleModel } from "../models/userModel.js";

const getUserController = async (req, res, next) => {
    try {
        const users = await getUserModel();
        // Se não houver usuários, retorna array vazio
        res.status(200).json(users || []);
    } catch (err) {
        console.error('Erro no controlador:', err);
        res.status(500).json({ 
            message: `Erro ao consultar os usuários: ${err.message}`
        });
    }
};

const createUserController = async (req, res, next) => {
    try {
        const userData = req.body;
        
        // Validações básicas
        if (!userData.nome || !userData.email || !userData.senha || !userData.tipo) {
            return res.status(400).json({ 
                message: 'Dados incompletos. Nome, email, senha e tipo são obrigatórios.' 
            });
        }

        if (!['professor', 'aluno'].includes(userData.tipo)) {
            return res.status(400).json({ 
                message: 'Tipo de usuário inválido. Deve ser "professor" ou "aluno".' 
            });
        }

        const result = await createUserModel(userData);
        res.status(201).json({ 
            message: 'Usuário criado com sucesso',
            usuario: result
        });
    } catch (err) {
        // Se for erro de email duplicado
        if (err.message.includes('já está cadastrado')) {
            return res.status(400).json({ 
                message: err.message 
            });
        }
        
        res.status(500).json({ 
            message: `Erro ao criar usuário: ${err.message}`
        });
    }
};

const getUserByRoleController = async (req, res, next) => {
    try {
        const { role } = req.params;
        
        // Validação da role
        const validRoles = ['professor', 'aluno', 'admin'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({
                message: 'Role inválida. Deve ser "professor", "aluno" ou "admin".'
            });
        }

        const users = await getUserByRoleModel(role);
        res.status(200).json(users || []);
    } catch (err) {
        console.error('Erro no controlador:', err);
        res.status(500).json({
            message: `Erro ao consultar os usuários por role: ${err.message}`
        });
    }
};

export default { getUserController, createUserController, getUserByRoleController };