export interface User {
  id: string;
  name: string;
  email: string;
  role: 'professor' | 'administrativo' | 'aluno';
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
}