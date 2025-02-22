# **Gym Check**

## Requisitos Funcionais
- [x] Deve ser possível se cadastrar
- [x] Deve ser possível se autenticar
- [x] Deve ser possível obter o perfil de um usuário logado
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado
- [x] Deve ser possível o usuário obter seu histórico de check-ins
- [x] Deve ser possível o usuário buscar academias com menos de 10km de distância
- [x] Deve ser possível o usuário buscar academias pelo nome
- [x] Deve ser possível o usuário realizar check-in em uma academia
- [ ] Deve ser possível validar o check-in de um usuário
- [x] Deve ser possível cadastrar uma academia

## Regras de Negócios
- [x] O usuário não deve poder se cadastrar com um e-mail duplicado
- [x] O usuário não pode fazer 2 check-ins no mesmo dia
- [x] O usuário não pode fazer check-in se não estiver (100m) da academia
- [ ] O check-in só pode ser validado até 20 minutos após ser criado
- [ ] O check-in só pode ser validado por administradores
- [ ] A academia só pode ser cadastrada por administradores

## Requisitos Não Funcionais
- [x] A senha do usuário precisa estar criptografada
- [x] Os dados da aplicação precisa estar persistidos em um banco PostgreSQL
- [x] Todas as listas de dados precisam estar paginadas com 20 itens por página
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token)