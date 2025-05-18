# App de Gestão Escolar

## 📱 Sobre o Projeto

Projeto desenvolvido para avaliação do curso de pós graduação de Desenvolvimento Full Stack - [FIAP](https://postech.fiap.com.br/). 
INTEGRANTES:
FERNANDA VIDAL DE JESUS

Aplicativo mobile desenvolvido em React Native com Expo para gestão escolar, permitindo diferentes níveis de acesso e funcionalidades para professores, administrativos e alunos.



<div align="justify">
O presente projeto se propões a cumprir os requisitos avaliativos descritos no documento disponibilizado pela instit Frontend (Mobile)

#### Frontend (Mobile)
Interface desenvolvida em React Native com Expo (v52.0.46), com uso de Context API e React Query (v5.75.7) para gerenciamento de estado;
Estilização com StyleSheet API do React Native;
Três rotas de acesso: aluno, professor e admin;
Sistema de login com autenticação de usuário para as três roles;
Tela home com listagem de todos os posts, contendo opções de editação e deleção exclusivas para admin;
Tela de visualização de post específico;
Tela de edição de post específico (acesso admin);
Tela de criação de post (acesso professor e admin);
Todas as rotas integradas consumindo API REST via Axios (v1.9.0);
Sistema de navegação implementado com Expo Router (v4.0.20);
Feedback tátil com expo-haptics (v14.0.1);
Suporte a ícones vetoriais com @expo/vector-icons (v14.0.2);
Navegação por tabs com @react-navigation/bottom-tabs (v7.2.0).

#### Backend (avaliado na fase 2)
desenvolvimento de servidor Node com Express;
persistência de dados com banco de dados relacional;
implementação de containers para subir a aplicação e orquestração dos mesmos;
automação através da configuração de esteira CI/CD para testes e deploy;
documentação técnica descrevendo a arquitetura do sistema, o uso da aplicaçaõ, setup inicial e experiências e desafios encontrados;
cobertura de testes de pelo menos 20% do código;
interface de usuário em React para interação com o sistema.

## 🛠️ Tecnologias

- React Native
- Expo
- TypeScript
- Expo Router
- Context API
- React Navigation

### 🎨 UI/UX

- Design consistente
- Feedback visual para ações
- Validações de formulários
- Navegação intuitiva
- Componentes reutilizáveis

</div>

<details>
<summary>Detalhes técnicos</summary>

</details>

<details>
<summary>Arquitetura</summary>

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
- Gerenciamento de professores
- Edição e exclusão de posts
- Acesso à lista de docentes

#### Professor
- Visualização de posts
- Criação de posts
- Edição de posts
- Gerenciamento de alunos
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

</details>


<details>
<summary>📦 Principais Funcionalidades</summary>

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

</details>

<details>
<summary>🚀 Como Executar</summary>

1. Clone o repositório
```bash
git clone [url-do-repositorio]
```

2. Instale as dependências
```bash
npm install
```

3. Suba o docker
```bash
docker-compose up -d --build
```

4. Execute o projeto
```bash
npx expo start
```
</details>
 
<details>
<summary>🔄 Fluxos Principais</summary>

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

</details>



<details>
<summary>📋 Requisitos e Dependências</summary>

### Requisitos do Sistema
- Node.js >= 18.0.0
- npm >= 9.0.0 ou Yarn >= 1.22.0
- Expo CLI >= 6.0.0
- iOS 13+ ou Android 6.0+
- Xcode 14+ (para desenvolvimento iOS)
- Android Studio (para desenvolvimento Android)

### Dependências Principais
```json
{
  "dependencies": {
    "expo": "~50.0.0",
    "expo-router": "~3.4.0",
    "expo-status-bar": "~1.11.1",
    "react": "18.2.0",
    "react-native": "0.73.2",
    "react-native-safe-area-context": "4.8.2",
    "react-native-screens": "~3.29.0",
    "@react-native-async-storage/async-storage": "1.21.0"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0",
    "@types/react": "~18.2.45",
    "typescript": "^5.1.3"
  }
}
```

### Configuração do Ambiente

1. **Node.js e npm**
   ```bash
   # Verificar versão do Node
   node --version
   # Deve mostrar v18.x.x ou superior

   # Verificar versão do npm
   npm --version
   # Deve mostrar 9.x.x ou superior
   ```

2. **Expo CLI**
   ```bash
   # Instalar Expo CLI globalmenteA
   npm install -g expo-cli

   # Verificar instalação
   expo --version
   ```

3. **Configuração iOS (Mac apenas)**
   - Instalar Xcode via App Store
   - Instalar Command Line Tools
   ```bash
   xcode-select --install
   ```

4. **Configuração Android**
   - Instalar Android Studio
   - Configurar ANDROID_HOME
   - Criar/Configurar emulador Android

### Configuração das Variáveis de Ambiente Android

#### Linux/MacOS
1. Abra o arquivo de perfil do seu shell (`.bashrc`, `.zshrc`, etc.):
```bash
# Para bash
nano ~/.bashrc

# Para zsh
nano ~/.zshrc
```

2. Adicione as seguintes linhas ao final do arquivo:
```bash
# Android SDK
export ANDROID_SDK_ROOT=$HOME/Android/Sdk
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/emulator
```

3. Salve o arquivo e recarregue as configurações:
```bash
# Para bash
source ~/.bashrc

# Para zsh
source ~/.zshrc
```

4. Verifique se as variáveis foram configuradas corretamente:
```bash
echo $ANDROID_HOME
# Deve mostrar o caminho do SDK
```


#### Observações Importantes
- Certifique-se de que o caminho do SDK corresponde à sua instalação
- Em algumas instalações do Android Studio, o SDK pode estar em um local diferente
- Para encontrar o caminho correto do SDK:
  1. Abra o Android Studio
  2. Vá para Settings/Preferences
  3. Procure por "Android SDK" em System Settings
  4. Copie o "Android SDK Location"

#### Verificação da Configuração
```bash
# Deve listar os dispositivos conectados (incluindo emuladores)
adb devices

# Deve mostrar a versão do Android SDK Platform-Tools
adb --version
```

#### Se não funcionar, inicie o emulador manualmente:
```
emulator @Pixel_3a_API_34_extension_level_7_x86_64
```

### Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto:
```env
API_URL=sua_url_api
ENV=development
```

### Instalação
```bash
# Clonar repositório
git clone [url-do-repositorio]

# Instalar dependências
npm install

# Instalar pods (iOS/Mac apenas)
cd ios && pod install && cd ..

# Iniciar aplicação
npx expo start
```

### Solução de Problemas Comuns

1. **Erro de versão do Node**
   ```bash
   nvm install 18
   nvm use 18
   ```

2. **Erro de dependências**
   ```bash
   rm -rf node_modules
   npm install
   ```

3. **Erro no Metro Bundler**
   ```bash
   npm start -- --reset-cache
   ```

4. **Erro no iOS**
   ```bash
   cd ios
   pod deintegrate
   pod install
   ```

</details>

<details>
<summary>🚀 Como Executar</summary>

1. Clone o repositório
```bash
git clone [url-do-repositorio]
```

2. Instale as dependências
```bash
npm install
```

3. Rode o seguintecomando para ver os emuladores disponíveis
```bash
emulator -list-avds
```bash

4. Inicie o emulador
```bash
emulator -avd Pixel_3a_API_34_extension_level_7_x86_64
```

5. Execute o projeto
```bash
npx expo start
```

</details>

<details>
<summary>🔧 Informações Técnicas</summary>

### Tecnologias Principais
- **React Native** com Expo (v52.0.46)
- **TypeScript**
- **Expo Router** (v4.0.20) para navegação
- **React Query** (@tanstack/react-query v5.75.7) para gerenciamento de estado
- **Axios** (v1.9.0) para requisições HTTP

### Sistema de Navegação
Utiliza uma combinação de bibliotecas modernas:
- **expo-router**: Sistema de arquivos baseado em navegação
- **react-navigation/native** (v7.0.14): Base da navegação
- **react-navigation/bottom-tabs** (v7.2.0): Navegação por tabs
- **expo-linking** (v7.0.5): Deep linking e URLs universais

### Componentes e UI
- **@expo/vector-icons** (v14.0.2): Ícones vetoriais
- **expo-constants** (v17.0.8): Constantes da plataforma
- **expo-font** (v13.0.4): Gerenciamento de fontes
- **expo-haptics** (v14.0.1): Feedback tátil
- **expo-system-ui** (v4.0.9): Interação com UI do sistema
- **expo-status-bar** (v2.0.1): Controle da barra de status
- **expo-splash-screen** (v0.29.24): Tela de splash
- **expo-web-browser** (v14.0.2): Funcionalidades de navegador

### Desenvolvimento e Testes
- **Jest** com preset jest-expo para testes
- **ESLint** para linting de código

### Scripts Disponíveis
```bash
# Iniciar o projeto
npm start              # ou: expo start

# Plataformas específicas
npm run android        # expo start --android
npm run ios           # expo start --ios
npm run web           # expo start --web

# Testes
npm test              # jest --watchAll

# Linting
npm run lint          # expo lint

# Reset do projeto
npm run reset-project # node ./scripts/reset-project.js
```

### Gerenciamento de Estado e Cache (@tanstack/react-query)
Configurado em `src/lib/queryClient.ts`:
```typescript
defaultOptions: {
  queries: {
    retry: 1,                        // Tenta refazer a requisição 1 vez em caso de erro
    staleTime: 1000 * 60 * 5,       // Dados considerados frescos por 5 minutos
    gcTime: 1000 * 60 * 30,         // Dados mantidos em cache por 30 minutos
    refetchOnWindowFocus: false,     // Não refaz requisição ao focar a janela
    refetchOnReconnect: true,        // Refaz requisição ao reconectar
  },
}
```

### Serviços de API (Axios)
Configurado em `src/services/api.ts`:
```typescript
const api = axios.create({
  baseURL: getBaseUrl(),     // URL base dinâmica baseada na plataforma
  timeout: 10000,            // Timeout de 10 segundos
});
```

#### Adaptação por Plataforma
- Android: `http://10.0.2.2:3000/api`
- iOS/outros: `http://localhost:3000/api`

#### Serviços Implementados
- **authService**: Autenticação de usuários
  - login (POST `/auth/${role}/login`)
- **postService**: Gerenciamento de posts
  - getPosts (GET `/post`)
  - getPostById (GET `/post/:id`)
  - createPost (POST `/post`)
  - updatePost (PUT `/post/:id`)
  - deletePost (DELETE `/post/:id`)
</details>
  
<details>
<summary>Endpoints</summary>

1- login: POST http://localhost:3000/api/$authType/login
   o authType pode ser professor ou admin

   body: {
      "email": "fernanda@escola.com" OU "admin@escola.com",
      "senha": "123456"
   }

1- lista de todas as postagens: GET http://localhost:3000/api/post

2- busca postagem por id: GET http://localhost:3000/api/post/1

3- criação de post: POST http://localhost:3000/api/post

    body: {
    "titulo": "Nova Postagem2",
    "subtitulo": "Conteúdo de prova",
    "conteudo": "Lorem ipsum...", 
    "idProfessor": "1",
    "idDisciplina": "1",
    "idSubdisciplina": "1"
    }

4- edição da postagem: PUT http://localhost:3000/api/post/1

    body: {
    "titulo" : "Nova Postagem alterada",
    "subtitulo" : "Conteúdo complementar",
    "conteudo" : "Lorem ipsum alterado..."
    }

5- lista de todas as postagens com dados do professor: GET http://localhost:3000/api/post/teacher

6- exclusão do post: DELETE http://localhost:3000/api/post/6

7- busca da postagem por termo: GET http://localhost:3000/api/post/search?term=Nova
</details>

### Relatos e Experiência

<div align="justify">
Já tenho hábilidade de desenvolvimento mobile com flutter, então houve uma certa dificuldade em entender a estrutura do react native, bem como sua estrutura e seus componentes nativos, mas após algumas pesquisas e estudos, consegui entender a estrutura e os requisitos funcionais e tecnicos.

Porém, obtive maior dificuldade por a minha estrutura já realizada na fase 2 (backend) ter sido estruturada antes de eu sair do meu grupo inicial, então nesta fase, encontrei dificuldade em realizar alterações na estrutura do banco de dados, isso me obrigou a tentar manobras alteranativas que não me obrigassem a construir toda o ambiente do banco de dados e backend novamente. Especialmente sob o temor de quebrar os endpoints já existentes e fazer com que tudo parasse de funcionar. 

O desafio de reestruturar o ambiente do backend para as novas necessidades do front se deu em especial porque eu tive que fazer todo o projeto, que foi pensado para ser feito em grupo, sozinha. Então, minha má sorte de cair em um grupo não colaborativo acabou me colocando nessas situação de dificuldade por falta do recurso mais escasso: tempo. Tenho certeza de que se o trabalho tivesse sido realizado em grupo, nós não teríamos dificuldades em administrar o tempo para ajustar todo o projeto para todos os requisitos, assim como acontece num time real de desenvolvimento. 

Mas, como também é demandado num time real de desenvolvimento, acredito que consegui praticar a a habilidade da flexibilização, adaptação e priorização e demonstrar o meu crescimento e aprendizado na stack que está sendo avaliada no módulo atual do curso. E diante disso e de toda a dificuldade que se apresentou, estou bastante satisfeita com o resultado que obtive.
</div>

