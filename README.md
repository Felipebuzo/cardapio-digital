#  Cardápio Digital

Sistema fullstack de cardápio digital com painel administrativo, desenvolvido como projeto de portfólio para vaga de desenvolvedor fullstack júnior.

**🔗 Acesse o projeto:**
- Cardápio (público): [cardapio-digital-sandy.vercel.app](https://cardapio-digital-sandy.vercel.app)
- API (backend): [cardapio-digital-production-b81d.up.railway.app](https://cardapio-digital-production-b81d.up.railway.app)

---

##  Screenshots

### Cardápio público
![foto do cardapio](cardapio.png)

### Painel administrativo
![foto da página de administrador](admin.png)

---

##  Sobre o projeto

O Cardápio Digital permite que um estabelecimento cadastre categorias e produtos (com nome, descrição, preço e imagem) através de um painel administrativo protegido por autenticação, enquanto os clientes visualizam o cardápio em uma página pública, organizada por categoria.

### Principais funcionalidades

- ✅ Autenticação com JWT (login do administrador)
- ✅ CRUD completo de categorias
- ✅ CRUD completo de produtos, com upload de imagem
- ✅ Listagem pública do cardápio, filtrada por categoria
- ✅ Proteção de rotas no frontend (painel admin acessível apenas autenticado)
- ✅ API REST documentada e organizada em camadas (Controller-Service-Repository)

---

##  Tecnologias utilizadas

### Backend
- **Node.js** + **Express** — servidor e rotas da API
- **Prisma ORM** + **MySQL** — modelagem e persistência de dados
- **JWT** (`jsonwebtoken`) — autenticação
- **bcryptjs** — hash de senhas
- **Multer** — upload de imagens
- **Helmet** + **express-rate-limit** + **CORS** — segurança da API

### Frontend
- **React** + **Vite** — interface e build
- **React Router DOM** — navegação entre páginas e rotas protegidas
- **Axios** — consumo da API
- **Tailwind CSS** — estilização

### Infraestrutura
- **Railway** — hospedagem do backend e do banco de dados MySQL
- **Vercel** — hospedagem do frontend



##  Arquitetura


cardapio-digital/
├── backend/
│   ├── prisma/              # Schema e migrations do banco
│   ├── src/
│   │   ├── config/          # Configuração do Prisma Client
│   │   ├── controllers/     # Lógica das rotas (categorias, produtos, auth)
│   │   ├── middlewares/     # Autenticação JWT, etc.
│   │   ├── routes/          # Definição das rotas da API
│   │   ├── uploads/         # Imagens enviadas (Multer)
│   │   └── server.js        # Ponto de entrada da aplicação
│   └── railway.json         # Configuração de build/deploy no Railway
│
└── frontend/
    ├── src/
    │   ├── components/      # Componentes reutilizáveis (ex: RotaProtegida)
    │   ├── pages/            # Páginas (Cardápio, Login, Admin)
    │   ├── services/         # Configuração do Axios e autenticação
    │   └── App.jsx           # Rotas da aplicação
    └── vercel.json           # Configuração de rewrite para SPA




##  Como rodar localmente

### Pré-requisitos
- Node.js 18+
- MySQL rodando localmente (ou um banco MySQL acessível)

### 1. Clone o repositório
```bash
git clone https://github.com/Felipebuzo/cardapio-digital.git
cd cardapio-digital
```

### 2. Configure o backend
```bash
cd backend
npm install
```

Crie um arquivo `.env` na pasta `backend` com:
```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/cardapio_digital"
JWT_SECRET="sua_chave_secreta_aqui"
PORT=3333
```

Rode as migrations e inicie o servidor:
```bash
npx prisma migrate dev
npm run dev
```

O backend estará disponível em `http://localhost:3333`.

### 3. Configure o frontend
Em outro terminal:
```bash
cd frontend
npm install
npm run dev
```

O frontend estará disponível em `http://localhost:5173`.

### 4. Crie o primeiro usuário administrador
Com o backend rodando, faça uma requisição `POST` para `http://localhost:3333/api/auth/register` com:
```json
{
  "email": "seu@email.com",
  "password": "sua_senha",
  "name": "Seu Nome"
}
```

Depois, acesse `http://localhost:5173/admin/login` para entrar no painel.

---

##  Decisões técnicas e aprendizados

Durante o desenvolvimento, alguns problemas reais precisaram ser resolvidos — e ficam registrados aqui porque fazem parte do aprendizado:

- **Migrations em produção**: o banco do Railway precisa que as migrations do Prisma sejam executadas no deploy (`npx prisma migrate deploy`), não apenas localmente. Isso foi configurado no `startCommand` do `railway.json`.
- **`trust proxy` no Express**: hospedagens como o Railway colocam a aplicação atrás de um proxy reverso. Sem `app.set('trust proxy', 1)`, bibliotecas como `express-rate-limit` quebram em produção ao identificar o IP do cliente.
- **Roteamento de SPA na Vercel**: rotas do React Router (como `/admin/login`) retornavam 404 em produção, pois a Vercel tentava localizar arquivos físicos. Resolvido com um `vercel.json` com regra de rewrite para `index.html`.
- **Variáveis de ambiente para URLs**: tanto a URL da API quanto a URL das imagens precisaram migrar de valores fixos (`localhost`) para variáveis de ambiente (`VITE_API_URL`), permitindo que o mesmo código funcione em desenvolvimento e produção.
- **Armazenamento de imagens**: o Railway utiliza um sistema de arquivos efêmero — uploads feitos via Multer não persistem entre deploys. Para um ambiente de produção real, a evolução natural seria migrar para um serviço de armazenamento externo (ex: Cloudinary ou AWS S3).

---

##  Sobre o uso de IA no desenvolvimento

Parte do desenvolvimento contou com apoio de IA (Claude) como ferramenta de estudo e par de programação — similar ao uso de documentação ou fóruns, mas de forma interativa. A IA foi usada para entender conceitos, revisar lógica e debugar problemas, mas toda a leitura de erros, decisões de arquitetura e escrita final do código foram conduzidas e validadas por mim.

---

##  Licença

Projeto desenvolvido para fins de estudo e portfólio.