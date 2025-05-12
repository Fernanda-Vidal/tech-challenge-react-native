const validatePost = (req, res, next) => {
    const { 
        titulo,
        subtitulo,
        conteudo,
        idProfessor,
        idDisciplina,
        idSubdisciplina } = req.body;

    if (!titulo || titulo.length < 5) return res.status(400).json(
        { message: '"titulo" é obrigatório e precisa ser maior que 5 caracteres.' }
    );
    if (!subtitulo || subtitulo.length < 5) return res.status(400).json(
        { message: '"subtitulo" é obrigatório e precisa ser maior que 5 caracteres.' }
    );
    if (!conteudo || conteudo.length < 2) return res.status(400).json(
        { message: '"conteudo" é obrigatório e precisa ser maior que 20 caracteres.' }
    );
    if (!idProfessor) return res.status(400).json(
        { message: '"idProfessor" é obrigatório.' }
    );
    if (!idDisciplina) return res.status(400).json(
        { message: '"idDisciplina" é obrigatório.' }
    );
    if (!idSubdisciplina) return res.status(400).json(
        { message: '"idSubdisciplina" é obrigatório.' }
    );

    return next();
};

export default validatePost;