export interface User {
  id: string;
  name: string;
  email: string;
  role: 'professor' | 'administrativo' | 'aluno';
}

export interface Post {
  id_postagem: number;
  titulo: string;
  subtitulo: string;
  conteudo: string;
  id_professor: number;
  nome_professor: string;
  id_disciplina: number;
  nome_disciplina: string;
  id_subdisciplina: number;
  nome_subdisciplina: string;
}