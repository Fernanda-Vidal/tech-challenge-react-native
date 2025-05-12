const validateLogin = (req, res, next) => {
    const { email, senha } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email é obrigatório' });
    }

    if (!email.includes('@')) {
        return res.status(400).json({ message: 'Email inválido' });
    }

    if (!senha) {
        return res.status(400).json({ message: 'Senha é obrigatória' });
    }

    if (senha.length < 6) {
        return res.status(400).json({ message: 'Senha deve ter no mínimo 6 caracteres' });
    }

    next();
};

export default validateLogin; 