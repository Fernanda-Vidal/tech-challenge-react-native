import { validateUser } from '../models/authModel.js';

export const loginUser = async (req, res) => {
    try {
        const user = req.validatedUser;
        const { userType } = req.params;
        
        const responseUser = {
            id: user.id_pessoa,
            nome: user.nome,
            email: user.email,
            role: userType
        };

        res.status(200).json(responseUser);
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}; 