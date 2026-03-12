
# Nest Postgres Scaffold

  

Projeto base para acelerar a criacao de APIs backend com NestJS.

Este repositorio foi estruturado para servir como ponto de partida para qualquer novo projeto, com autenticacao, autorizacao e modulos principais ja prontos.

  

## ATENÇÃO - SEGURANÇA ANTES DE SUBIR

  

ANTES DE SUBIR O PROJETO, ATUALIZE O ARQUIVO `.env` COM INFORMACOES SECRETAS REAIS.

  

Fluxo recomendado:

  

```bash

cp  env.example  .env

```

  

Depois disso, altere os valores sensiveis (ex.: `JWT_SECRET`, `CRYPTO_KEY`, credenciais de banco e chave do SendGrid).

Nao utilize os valores padrao em ambiente real.

  

## Subindo o projeto

  

Para subir o projeto, basta executar:

  

```bash

docker-compose  up

```

## Uso com Dev Container (VS Code)

Para facilitar o desenvolvimento e evitar problemas de ambiente local, o projeto ja possui configuracao em `.devcontainer/devcontainer.json`.

Passo a passo:

1. Instale a extensao **Dev Containers** no VS Code (`ms-vscode-remote.remote-containers`).
2. Com o projeto aberto, execute o comando `Dev Containers: Reopen in Container`.
3. O VS Code vai iniciar o ambiente com base no `docker-compose.yml`, usando o servico `api`.
4. A partir disso, voce desenvolve com o mesmo ambiente padrao para todo o time.

Beneficios:

- padronizacao de versoes de runtime e dependencias
- onboarding mais rapido para novos devs
- reducao de erros de "funciona na minha maquina"

  

## Stack do projeto

  

- Node.js 22

- TypeScript

- NestJS 9

- PostgreSQL 17

- TypeORM 0.3

- JWT + Passport (local e bearer)

- Swagger (OpenAPI)

- SendGrid para envio de e-mails

- Docker + Docker Compose

  

## Funcionalidades ja presentes

  

- Autenticacao JWT pronta para uso.

- Login com estrategia local (`email` + `password`).

- Controle de acesso por nivel de usuario (guard para role `ADMIN`).

	- Gestao de usuarios:

	- cadastro de usuario

	- criacao de usuario administrador

	- listagem paginada

	- busca por documento

	- atualizacao

	- remocao

	- validacao de conta por e-mail

	- alteracao de senha

	- fluxo de esqueci minha senha e recuperacao por token
	- Selecao de role ativa no token (`set-role`).

- Gestao de roles (CRUD) protegida para administradores.



  

## Usuario administrador pre-cadastrado

  

As migrations iniciais criam a role `ADMIN` e um usuario administrador padrao:

  

- E-mail: `admin@scaffold.com`

- Documento: `14980700004`

- Senha inicial: `123456`

  

Por seguranca, altere a senha apos o primeiro acesso.

  

## Documentacao Swagger

  

A documentacao da API ja vem configurada via Swagger em:

  

-  `http://localhost:3000/docs`

  

A configuracao inclui suporte a `Bearer Token` e persistencia de autorizacao na interface.

  

## Modulo de envio de e-mails (SendGrid)

  

O projeto ja conta com modulo de envio de e-mails utilizando SendGrid, incluindo fluxos de:

  

- confirmacao/validacao de conta

- recuperacao de senha

  

Para habilitar o envio, configure a variavel `SENDGRID_API_KEY` no `.env`.

  

## Arquivo env.example

  

O arquivo `env.example` ja possui as informacoes basicas para inicializacao do projeto, como:

  

- conexao com banco (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME`, `DB_LOG`)

- segredo JWT (`JWT_SECRET`)

- chave de criptografia (`CRYPTO_KEY`)

  

Use esse arquivo como base para montar seu `.env`.
