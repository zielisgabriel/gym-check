# 🏋️ Gym Check - Sistema de Gestão de Academia

#### Sistema completo para gestão de check-ins para academias.

## ✨ Funcionalidades Principais

- **Gestão de Membros**
  - Cadastro completo
  - Criação de check-ins de até 100 metros da academia
  - Ter limite de até 20 minutos para validar o check-in na própria academia
  - Histórico de check-ins

- **Gestão Administrativa**
  - Criação de academias
  - Validar check-ins dentro de 20 minutos que foi feito

## 🚀 Começando

### Pré-requisitos

- Node.js 18+
- PostgreSQL 14+

### Instalação

```bash
git clone https://github.com/zielisgabriel/gym-check.git
cd gym-check
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

### Configuração do Ambiente
- **Adicione estas variáveis no seu .env:**
```ini
API_PORT=3000
DATABASE_URL="postgresql://user:password@localhost:5432/gymcheck"
JWT_SECRET="sua_chave_secreta_aqui"
```

## 🔧 Tecnologias Utilizadas
- **Backend**: Express + Prisma ORM
- **Autenticação**: JWT
- **Infra**: Docker
- **Testes**: Vitest

## 📄 Documentação da API
- **Endpoints principais:**

    - **[POST] /users**
        - Cadastra usuários
    - **[POST] /sessions**
        - Entrar com a conta
    - **[GET] /me**
        - Pegar credenciais do usuário
    - **[PATCH] /token/refresh**
        - Realizar a atualização do token
    - **[POST] /gyms**
        - Cadastrar uma academia (Somente Admins)
    - **[GET] /gyms/search**
        - Buscar por academias pelo nome
    - **[GET] /gyms/nearby**
        - Listar academias próximas a 100 metros
    - **[POST] /gyms/:gymId/check-ins**
        - Criar um check-in
    - **[GET] /check-ins/:userId/history**
        - Mostrar histórico de check-ins feitos pelo usuário
    - **[GET] /check-ins/:checkInId/validate**
        - Validar check-in do usuário (Somente Admins)
    
## 🤝 Como Contribuir
1. **Faça um fork do projeto**

2. **Crie sua branch (git checkout -b feature/nova-funcionalidade)**

3. **Commit suas mudanças (git commit -m 'Adiciona nova funcionalidade')**

4. **Push para a branch (git push origin feature/nova-funcionalidade)**

5. **Abra um Pull Request**

## **RF, RNF, RN da aplicação**

### Requisitos Funcionais
- [x] Deve ser possível se cadastrar
- [x] Deve ser possível se autenticar
- [x] Deve ser possível obter o perfil de um usuário logado
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado
- [x] Deve ser possível o usuário obter seu histórico de check-ins
- [x] Deve ser possível o usuário buscar academias com menos de 10km de distância
- [x] Deve ser possível o usuário buscar academias pelo nome
- [x] Deve ser possível o usuário realizar check-in em uma academia
- [x] Deve ser possível validar o check-in de um usuário
- [x] Deve ser possível cadastrar uma academia

### Regras de Negócios
- [x] O usuário não deve poder se cadastrar com um e-mail duplicado
- [x] O usuário não pode fazer 2 check-ins no mesmo dia
- [x] O usuário não pode fazer check-in se não estiver (100m) da academia
- [x] O check-in só pode ser validado até 20 minutos após ser criado
- [x] O check-in só pode ser validado por administradores
- [x] A academia só pode ser cadastrada por administradores

### Requisitos Não Funcionais
- [x] A senha do usuário precisa estar criptografada
- [x] Os dados da aplicação precisa estar persistidos em um banco PostgreSQL
- [x] Todas as listas de dados precisam estar paginadas com 20 itens por página
- [x] O usuário deve ser identificado por um JWT (JSON Web Token)