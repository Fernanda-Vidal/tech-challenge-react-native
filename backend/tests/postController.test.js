const request = require('supertest');
const express = require('express');
const app = express();
import postRoute from '../src/routes/post.router';
const { createPostModel, searchPostModel, searchPostByIdModel, getAllPostsModel, deletePostByIdModel, getAllPostsByTeacherModel } = require('../src/models/postModel'); 

// Mock das funções do model
jest.mock('../src/models/postModel', () => ({
    createPostModel: jest.fn(),
    searchPostModel: jest.fn(),
    searchPostByIdModel: jest.fn(),
    getAllPostsModel: jest.fn(),
    deletePostByIdModel: jest.fn(),
    getAllPostsByTeacherModel: jest.fn()
}));

app.use(express.json());  // Para poder parsear JSON no corpo das requisições
app.use('/post', postRoute); // Use o router com a rota POST para criar post

beforeEach(() => {
    jest.clearAllMocks();
});

describe('POST - criação de postagem: /post', () => {
    
    // Teste de sucesso
    it('Deve criar um novo post e retornar status 201', async () => {
        // Arrange: Mock do modelo para simular a criação do post
    const mockNewPost = {
        id_postagem: 10,
        titulo: "Post título",
        subtitulo: "Subtítulo",
        conteudo: "Conteúdo",
        id_professor: 1,
        id_disciplina: 1,
        id_subdisciplina: 1,
    };
    

    const mockNewPostFailed = {
        id_postagem: 10,
        titulo: "Post título",
        subtitulo: "Subtítulo",
        conteudo: "Conteúdo",
        id_professor: 1,
        id_disciplina: 1,
        // id_subdisciplina: 1,
    };

        const postData = {
            "titulo": "Post título",
            "subtitulo": "Subtítulo",
            "conteudo": "Conteúdo",
            "idProfessor": 1,
            "idDisciplina": 1,
            "idSubdisciplina": 1,
        };

        createPostModel.mockResolvedValue(mockNewPost);
   
        // Act: Faça a requisição POST
        const response = await 
            request(app)
                .post('/post')
                .send(postData);

        expect(createPostModel).toHaveBeenCalledTimes(1);
        expect(createPostModel).toHaveBeenCalledWith(
            postData.titulo,
            postData.subtitulo,
            postData.conteudo,
            postData.idProfessor,
            postData.idDisciplina,
            postData.idSubdisciplina
        );

        // Assert: Verifique se a resposta foi correta
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('newPost');
        expect(response.body.newPost).toEqual(mockNewPost);
        expect(response.body.newPost).not.toEqual(mockNewPostFailed);
    
    });

    // Teste de falha
    it('Deve retornar status 422 em caso de erro na criação do post no banco de dados', async () => {
        // Arrange: Simule um erro no modelo
        createPostModel.mockRejectedValue(new Error('"message": "erro: relation \"postagemd\" does not exist"'));

        const postData = {
            titulo: 'Post título',
            subtitulo: 'Subtítulo',
            conteudo: 'Conteúdo',
            idProfessor: 1,
            idDisciplina: 2,
            idSubdisciplina: 3,
        };

        // Act: Faça a requisição POST
        const response = await request(app)
            .post('/post')
            .send(postData);

        // Assert: Verifique se a resposta foi de erro
        expect(response.status).toBe(422);
        expect(response.body).toHaveProperty('message');
        // expect(response.body.message).toContain('message');
    });

    // Teste de falha
    it('Deve retornar 400 em  caso de faltar algum parâmetro obrigatório no corpo da requisição', async () => {
        createPostModel.mockRejectedValue(new Error('Faltando parâmetro obrigatório'));
        
        const postData = {
            subtitulo: 'Subtítulo',
            conteudo: 'Conteúdo',
            idProfessor: 1,
            idDisciplina: 2,
            idSubdisciplina: 3,
        };

        const response = await request(app)
            .post('/post')
            .send(postData);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain('é obrigatório')

    })
});

describe('GET - busca de postagens por termo: /post/search', () => {
    it('Deve retornar a lista de postagens cadastradas e o status 200', async () => {
        const mockPostList = {
            "post": [
                {
                    "id_postagem": 1,
                    "titulo": "Nova Postagem1",
                    "subtitulo": "Subtítulo",
                    "conteudo": "Conteúdo",
                    "id_professor": 1,
                    "id_disciplina": 1,
                    "id_subdisciplina": 1
                }, {
                    "id_postagem": 2,
                    "titulo": "Nova Postagem2",
                    "subtitulo": "Subtítulo",
                    "conteudo": "Conteúdo",
                    "id_professor": 1,
                    "id_disciplina": 1,
                    "id_subdisciplina": 1
                }
            ]
        };

        const mockPostListFailed = {
            "post": [
                {
                    // "id_postagem": 1,
                    "titulo": "Nova Postagem1",
                    "subtitulo": "Subtítulo",
                    "conteudo": "Conteúdo",
                    "id_professor": 1,
                    "id_disciplina": 1,
                    "id_subdisciplina": 1
                }, {
                    "id_postagem": 2,
                    "titulo": "Nova Postagem2",
                    "subtitulo": "Subtítulo",
                    "conteudo": "Conteúdo",
                    "id_professor": 1,
                    "id_disciplina": 1,
                    "id_subdisciplina": 1
                }
            ]
        };


        searchPostModel.mockResolvedValue(mockPostList);

        const response = await request(app).get('/post/search?term=Nova');
            
        expect(response.status).toBe(200);
        expect(response.body.post).toEqual(mockPostList);
        expect(response.body.post).not.toEqual(mockPostListFailed);

    })

    it('Deve retornar a propriedade "post" e o status 200, porém com um array vazio', async () => {
        searchPostModel.mockResolvedValue([]);

        const responseEmpty = await request(app).get('/post/search?term=aaa');

        const mockPostList = {
            "post": [
                {
                    "id_postagem": 1,
                    "titulo": "Nova Postagem1",
                    "subtitulo": "Subtítulo",
                    "conteudo": "Conteúdo",
                    "id_professor": 1,
                    "id_disciplina": 1,
                    "id_subdisciplina": 1
                }, {
                    "id_postagem": 2,
                    "titulo": "Nova Postagem2",
                    "subtitulo": "Subtítulo",
                    "conteudo": "Conteúdo",
                    "id_professor": 1,
                    "id_disciplina": 1,
                    "id_subdisciplina": 1
                }
            ]
        };

        expect(responseEmpty.status).toBe(200);
        expect(responseEmpty.body).toHaveProperty('post');
        expect(responseEmpty.body.post).toEqual([]);
        expect(responseEmpty.body.post).not.toEqual(mockPostList);  
    })
})

describe('GET - busca de postagem por ID: /post/:id', () => {
    it('Deve retornar uma postagem específica por ID e status 200', async () => {
        const mockPost = {
            "id_postagem": 1,
            "titulo": "Nova Postagem1",
            "subtitulo": "Subtítulo",
            "conteudo": "Conteúdo",
            "id_professor": 1,
            "id_disciplina": 1,
            "id_subdisciplina": 1
        };

        searchPostByIdModel.mockResolvedValue(mockPost);

        const response = await request(app).get('/post/1');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('post');
        expect(response.body.post).toEqual(mockPost);
    });

    it('Deve retornar status 422 quando ocorrer um erro ao buscar a postagem', async () => {
        searchPostByIdModel.mockRejectedValue(new Error('Erro ao buscar postagem'));

        const response = await request(app).get('/post/999');

        expect(response.status).toBe(422);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain('erro:');
    });
});

describe('GET - busca de todas as postagens: /post', () => {
    it('Deve retornar todas as postagens e status 200', async () => {
        const mockPosts = {
            "posts": [
                {
                    "id_postagem": 1,
                    "titulo": "Primeira Postagem",
                    "subtitulo": "Subtítulo 1",
                    "conteudo": "Conteúdo 1",
                    "id_professor": 1,
                    "id_disciplina": 1,
                    "id_subdisciplina": 1
                },
                {
                    "id_postagem": 2,
                    "titulo": "Segunda Postagem",
                    "subtitulo": "Subtítulo 2",
                    "conteudo": "Conteúdo 2",
                    "id_professor": 1,
                    "id_disciplina": 1,
                    "id_subdisciplina": 1
                }
            ]
        };

        getAllPostsModel.mockResolvedValue(mockPosts.posts);

        const response = await request(app).get('/post');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('posts');
        expect(response.body).toEqual(mockPosts);
    });

    it('Deve retornar um array vazio quando não houver postagens', async () => {
        getAllPostsModel.mockResolvedValue([]);

        const response = await request(app).get('/post');

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('posts');
        expect(response.body.posts).toEqual([]);
    });

    it('Deve retornar status 422 quando ocorrer um erro ao buscar as postagens', async () => {
        getAllPostsModel.mockRejectedValue(new Error('Erro ao buscar postagens'));

        const response = await request(app).get('/post');

        expect(response.status).toBe(422);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain('erro:');
    });
});

describe('DELETE - deleção de postagem por ID: /post/:id', () => {
    
    // Teste de sucesso
    it('Deve deletar o post e retornar status 200', async () => {
        
        const mockNewPost = {
            id_postagem: 3,
            titulo: "Post edição título",
            subtitulo: "Post edição Subtítulo",
            conteudo: "Post edição Conteúdo",
            id_professor: 1,
            id_disciplina: 1,
            id_subdisciplina: 1,
        };

        const mockNewPostFailed = {
            id_postagem: 5,
            titulo: "Post edição título 5",
            subtitulo: "Post edição Subtítulo 5",
            conteudo: "Post edição Conteúdo 5",
            id_professor: 1,
            id_disciplina: 1,
            id_subdisciplina: 2,
        };

        const postData = {
            "id_postagem" : "3"
        };

        deletePostByIdModel.mockResolvedValue(mockNewPost);

        // Act: Faça a requisição DELETE
        const response = await 
            request(app)
                .delete('/post/3')
                .send(postData);

        expect(deletePostByIdModel).toHaveBeenCalledTimes(1);
        expect(deletePostByIdModel).toHaveBeenCalledWith(
            postData.id_postagem
        );

        // Assert: Verifique se a resposta foi correta
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('post');
        expect(response.body.post).toEqual(mockNewPost);
        expect(response.body.post).not.toEqual(mockNewPostFailed);
    
    });

    // Teste de falha
    it('Deve retornar status 422 caso apresentar erro na edição da postagem', async () => {
        // Arrange: Simule um erro no modelo
        deletePostByIdModel.mockRejectedValue(new Error('"message": "erro: relation \"postagem\" does not exist"'));
        
        const mockNewPostFailed = {
            id_postagem: 100,
            titulo: "Post edição título",
            subtitulo: "Post edição Subtítulo",
            conteudo: "Post edição Conteúdo",
            id_professor: 1,
            id_disciplina: 1,
            id_subdisciplina: 1,
        };

        const postData = {
            "id_postagem" : "100"
        };

        // Act: Faça a requisição DELETE
        const response = await request(app)
            .delete('/post/100')
            .send(postData);

        expect(deletePostByIdModel).toHaveBeenCalledTimes(1);
        expect(deletePostByIdModel).toHaveBeenCalledWith(
            postData.id_postagem
        );

        // Assert: Verifique se a resposta foi de erro
        expect(response.status).toBe(422);
        expect(response.body).toHaveProperty('message');
        expect(response.body.post).not.toEqual(mockNewPostFailed);
    });
});

describe('GET - busca de todas as postagens com dados do professor: /post/teacher', () => {
    it('Deve retornar todas as postagens com dados do professor e status 200', async () => {
        const mockPosts = {
            "posts": [
                {
                    "id_postagem": 1,
                    "titulo": "Título do post",
                    "subtitulo": "Subtítulo",
                    "conteudo": "Conteúdo do post",
                    "id_professor": 1,
                    "id_disciplina": 1,
                    "id_subdisciplina": 1,
                    "nome_professor": "Marcia",
                    "nome_disciplina": "portugues",
                    "nome_subdisciplina": "literatura"
                },
                {
                    "id_postagem": 2,
                    "titulo": "Outro post",
                    "subtitulo": "Outro subtítulo",
                    "conteudo": "Outro conteúdo",
                    "id_professor": 1,
                    "id_disciplina": 1,
                    "id_subdisciplina": 1,
                    "nome_professor": "Marcia",
                    "nome_disciplina": "portugues",
                    "nome_subdisciplina": "literatura"
                }
            ]
        };

        const mockPostsFailed = {
            "posts": [
                {
                    "id_postagem": 1,
                    "titulo": "Título do post",
                    "subtitulo": "Subtítulo",
                    "conteudo": "Conteúdo do post",
                    "id_professor": 1,
                    "id_disciplina": 1,
                    "id_subdisciplina": 1
                    // sem os dados do professor
                }
            ]
        };

        getAllPostsByTeacherModel.mockResolvedValue(mockPosts.posts);

        const response = await request(app).get('/post/teacher');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('posts');
        expect(response.body).toEqual(mockPosts);
        expect(response.body).not.toEqual(mockPostsFailed);
    });

    it('Deve retornar status 404 quando não houver postagens', async () => {
        getAllPostsByTeacherModel.mockResolvedValue([]);

        const response = await request(app).get('/post/teacher');

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('posts');
        expect(response.body.posts).toEqual([]);
    });

    it('Deve retornar status 422 quando ocorrer um erro ao buscar as postagens', async () => {
        getAllPostsByTeacherModel.mockRejectedValue(new Error('Erro ao buscar postagens com dados do professor'));

        const response = await request(app).get('/post/teacher');

        expect(response.status).toBe(422);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain('erro:');
    });
});