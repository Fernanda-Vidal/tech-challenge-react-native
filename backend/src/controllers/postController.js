import { createPostModel, searchPostModel, searchPostByIdModel, updatePostByIdModel, deletePostByIdModel, getAllPostsModel, getAllPostsByTeacherModel } from "../models/postModel.js";

const createPostController = async (req, res, next) => {
    try {
        const { titulo, subtitulo, conteudo, idProfessor, idDisciplina, idSubdisciplina} = req.body;
        const newPost = await createPostModel(titulo, subtitulo, conteudo, idProfessor, idDisciplina, idSubdisciplina);
        return res.status(201).json({ newPost });
    } catch (err) {
        res.status(422).json({ message: `erro: ${err.message}`});
    }
};

const searchPostController = async (req, res, next) => {
    try {
        const { term } = req.query;

        if (!term ) return res.status(400).json({ message: '"term" is required' });
        
        const post = await searchPostModel(term);

        return res.status(200).json({ post })
    } catch (err) {
        res.status(422).json({ message: `erro: ${err.message}`});
    }
}

const getPostagemByIdController = async (req, res, next) => {
    try {
        const id = req.params.id;
        
        const post = await searchPostByIdModel(id);

        return res.status(200).json({ post })
    } catch (err) {
        res.status(422).json({ message: `erro: ${err.message}`});
    }
}

const updatePostByIdController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { titulo, subtitulo, conteudo, idProfessor, idDisciplina, idSubdisciplina } = req.body;
        
        const post = await updatePostByIdModel(id, titulo, subtitulo, conteudo, idProfessor, idDisciplina, idSubdisciplina);
        
        if (post.length == 0) return res.status(404).json({ post });

        return res.status(200).json({ post })
    } catch (err) {
        res.status(422).json({ message: `erro: ${err.message}`});
    }
}

const deletePostByIdController = async (req, res, next) => {
    try {
        const id = req.params.id;
        
        const post = await deletePostByIdModel(id);

        return res.status(200).json({ post })
    } catch (err) {
        res.status(422).json({ message: `erro: ${err.message}`});
    }
}

const getAllPostsController = async (req, res, next) => {
    try {
        const posts = await getAllPostsModel();

        if (posts.length == 0) return res.status(200).json({ posts });
        return res.status(200).json({ posts });
    } catch (err) {
        res.status(422).json({ message: `erro: ${err.message}`});
    }
};

const getAllPostsByTeacherController = async (req, res, next) => {
    try {
        const posts = await getAllPostsByTeacherModel();

        if (posts.length == 0) return res.status(200).json({ posts });
        return res.status(200).json({ posts });
    } catch (err) {
        res.status(422).json({ message: `erro: ${err.message}`});
    }
};

export default { createPostController, searchPostController, getPostagemByIdController, updatePostByIdController, deletePostByIdController, getAllPostsController, getAllPostsByTeacherController };