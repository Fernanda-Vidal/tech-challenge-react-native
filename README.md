# App de Gestão Escolar

## 📱 Sobre o Projeto

Aplicativo mobile desenvolvido em React Native com Expo para gestão escolar, permitindo diferentes níveis de acesso e funcionalidades para professores, administrativos e alunos.

## 🏗️ Arquitetura

### Estrutura de Diretórios
```
src/
├── app/                    # Páginas da aplicação (Expo Router)
│   ├── _layout.tsx        # Layout principal e configuração de rotas
│   ├── home.tsx           # Tela inicial
│   ├── login.tsx          # Tela de login
│   ├── register-teacher/  # Funcionalidades de professores
│   ├── edit-teacher/      # Edição de professores
│   ├── students/          # Gestão de alunos
│   ├── edit-profile/      # Edição de perfil
│   └── edit-post/         # Edição de posts
├── components/            # Componentes reutilizáveis
├── contexts/             # Contextos React (Auth, etc)
├── types/                # Definições de tipos TypeScript
└── utils/                # Funções utilitárias
```

### 🔐 Sistema de Autenticação

- Gerenciado pelo `AuthContext`
- Três níveis de acesso:
  - Administrativo
  - Professor
  - Aluno
- Persistência de sessão
- Rotas protegidas

### 👥 Controle de Acesso

#### Administrativo
- Visualização de todos os posts
- Gerenciamento de professores (CRUD)
- Edição e exclusão de posts
- Acesso à lista de docentes

#### Professor
- Criação de posts
- Gerenciamento de alunos (CRUD)
- Edição do próprio perfil
- Cadastro de outros professores

#### Aluno
- Visualização de posts
- Acesso básico ao sistema

### 📝 Gestão de Conteúdo

- Sistema de posts com:
  - Título
  - Conteúdo
  - Autor
  - Data
- Funcionalidades de busca
- Paginação de conteúdo

### 🎨 UI/UX

- Design consistente
- Feedback visual para ações
- Validações de formulários
- Navegação intuitiva
- Componentes reutilizáveis

## 🛠️ Tecnologias

- React Native
- Expo
- TypeScript
- Expo Router
- Context API
- React Navigation

## 📦 Principais Funcionalidades

### Autenticação
- Login com email/senha
- Identificação automática de roles
- Logout
- Persistência de sessão

### Gestão de Usuários
- Cadastro de professores
- Cadastro de alunos
- Edição de perfil
- Alteração de senha

### Posts
- Criação de posts
- Edição de posts (admin)
- Exclusão de posts (admin)
- Listagem paginada
- Busca por conteúdo

### Administrativo
- Gestão completa de professores
- Controle total sobre posts
- Dashboard administrativo

### Professores
- Gestão de alunos
- Criação de conteúdo
- Edição de perfil próprio

## 🚀 Como Executar

1. Clone o repositório
```bash
git clone [url-do-repositorio]
```

2. Instale as dependências
```bash
npm install
```

3. Execute o projeto
```bash
npx expo start
```

## 🔄 Fluxos Principais

### Fluxo de Autenticação
1. Usuário acessa o app
2. Realiza login com email/senha
3. Sistema identifica a role
4. Redireciona para home específica

### Fluxo Administrativo
1. Login como admin
2. Acesso à lista de docentes
3. Gerenciamento de professores
4. Controle de posts

### Fluxo de Professor
1. Login como professor
2. Criação de posts
3. Gestão de alunos
4. Edição de perfil

### Fluxo de Aluno
1. Login como aluno
2. Visualização de posts
3. Navegação básica

## 📱 Telas Principais

- Login
- Home (específica por role)
- Lista de Professores
- Lista de Alunos
- Edição de Perfil
- Criação/Edição de Posts
- Cadastro de Professores/Alunos

## 🔒 Segurança

- Validação de inputs
- Proteção de rotas
- Controle de acesso por role
- Sanitização de dados
- Feedback de erros

## 🎯 Próximos Passos

- [ ] Implementação de testes
- [ ] Integração com backend
- [ ] Cache offline
- [ ] Notificações push
- [ ] Relatórios e analytics
- [ ] Melhorias de performance
- [ ] Temas dark/light
- [ ] Acessibilidade


