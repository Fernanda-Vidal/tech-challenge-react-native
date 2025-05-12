const request = require('supertest');
const express = require('express');
const app = express();
import userRoute from '../src/routes/user.router';
const { getUserModel } = require('../src/models/userModel');

jest.mock('../src/models/userModel', () => ({
    getUserModel: jest.fn()
}));

app.use(express.json());
app.use('/users', userRoute);

beforeEach(() => {
    jest.clearAllMocks();
});

describe('GET /users', () => {
    it('Deve retornar a lista de usuários com o status 200', async () => {
        const mockUsers = [
            {
              "id_aluno": 1,
              "nome_aluno": "Adriana Calcanhoto",
              "id_turma": 1
            },
            {
              "id_aluno": 2,
              "nome_aluno": "Bruno Mars",
              "id_turma": 1
            },
            {
              "id_aluno": 3,
              "nome_aluno": "Coralie Barbier",
              "id_turma": 1
            }
          ];

          const mockUsersFailed = [
            // {
            //   "id_aluno": 1,
            //   "nome_aluno": "Adriana Calcanhoto",
            //   "id_turma": 1
            // },
            {
              "id_aluno": 2,
              "nome_aluno": "Bruno Mars",
              "id_turma": 1
            },
            {
              "id_aluno": 3,
              "nome_aluno": "Coralie Barbier",
              "id_turma": 1
            }
          ];

        getUserModel.mockResolvedValue(mockUsers);
        const response = await request(app).get('/users');
        
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockUsers);
        expect(response.body).not.toEqual(mockUsersFailed);
    })
})