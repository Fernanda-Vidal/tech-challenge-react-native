const validatePostId = (req, res, next) => {
    const id = req.params.id;;
    
    if (isNaN(id)) return res.status(400).json(
        { message: '"id" informado é inválido.' }
    );

    return next();
};

export default validatePostId;