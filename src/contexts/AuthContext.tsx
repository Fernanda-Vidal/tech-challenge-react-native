import React, { createContext, useState, useContext } from 'react';
import { User } from '../types';

// Define o formato dos dados do contexto
export interface AuthContextData {
  user: User | null;
  signIn: (email: string, password: string, role?: string) => Promise<void>;
  signOut: () => void;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
}

// Cria o contexto
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Componente Provider que vai envolver a aplicação
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (email: string, password: string, role?: string) => {
    try {
      console.log('Role recebida no signIn:', role);
      // Simulando uma verificação básica para diferentes tipos de usuário
      if (role === 'admin') {
        const mockAdminUser: User = {
          id: '1',
          name: 'Administrador',
          email: email,
          role: 'administrativo'
        };
        setUser(mockAdminUser);
      } else if (role === 'professor') {
        const mockTeacherUser: User = {
          id: '2',
          name: 'Professor Exemplo',
          email: email,
          role: 'professor'
        };
        setUser(mockTeacherUser);
      } else {
        // Se não houver role ou for aluno
        const mockStudentUser: User = {
          id: '3',
          name: 'Aluno Exemplo',
          email: email || 'aluno@escola.com',
          role: 'aluno'
        };
        setUser(mockStudentUser);
      }
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  };

  const signOut = () => {
    setUser(null);
  };

  const updateUserProfile = async (data: Partial<User>) => {
    try {
      if (user) {
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      signIn,
      signOut,
      updateUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para usar o contexto
export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  
  return context;
} 