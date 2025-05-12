import { getUserModel } from "../models/userModel.js";

const getUserController = async (req, res, next) => {
    try {
        const users = await getUserModel();
        res.status(200).json(users);
     } catch (err) {
        res.status(500).json({ message: `Erro ao consultar os usuários: ${err.message}`});
     }
};

export default { getUserController };