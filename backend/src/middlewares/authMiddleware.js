import { validateUser } from '../models/authModel.js';

const authMiddleware = async (req, res, next) => {
    try {
        const { email, senha } = req.body;
        const { userType } = req.params;

        if (!userType || (userType !== 'professor' && userType !== 'admin')) {
            return res.status(400).json({ message: 'Tipo de usuário inválido' });
        }

        const user = await validateUser(email, senha, userType);
        
        if (!user) {
            return res.status(401).json({ message: 'Email ou senha inválidos' });
        }

        req.validatedUser = user;

        next();
    } catch (error) {
        console.error('Erro na autenticação:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

export default authMiddleware;