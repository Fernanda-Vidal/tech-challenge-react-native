import axios, { AxiosError } from 'axios';
import { Platform } from 'react-native';

// Configuração da URL base dependendo do ambiente
const getBaseUrl = () => {
  if (Platform.OS === 'android') {
    // Para emulador Android
    console.log('Plataforma: Android - usando 10.0.2.2');
    return 'http://10.0.2.2:3000/api';
  }
  // Para iOS e outros casos
  console.log('Plataforma:', Platform.OS, '- usando localhost');
  return 'http://localhost:3000/api';
};

const baseURL = getBaseUrl();
console.log('URL base configurada:', baseURL);

export const api = axios.create({
  baseURL,
  timeout: 10000, // timeout de 10 segundos
});

interface LoginRequest {
  email: string;
  password: string;
  role: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export const authService = {
  login: async ({ email, password, role }: LoginRequest): Promise<LoginResponse> => {
    try {
      const url = `/auth/${role}/login`;
      const data = {
        email: email.trim(),
        senha: password.trim(),
      };

      console.log('Fazendo requisição para:', api.defaults.baseURL + url);
      console.log('Dados enviados:', { ...data, role });
      
      const response = await api.post(url, data);
      
      console.log('Resposta recebida:', response.data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Erro detalhado:', {
          message: error.message,
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
        });
      } else {
        console.error('Erro não esperado:', error);
      }
      throw error;
    }
  },
}; 