# Nosso Morador de Rua

Sistema para cadastro e acompanhamento de moradores de rua por Ong`s ou equipes de Serviço Social.

Permite o cadastro do morador de rua com as seguintes características:

- Nome
- Cidade/UF de Moradia
- Cidade de Origem
- Foto
- Histórico

Após o cadastro realizado o usuário poderá editar para cada morador de rua:

- Suas Necessidades atuais;
- Informações Sociais de emergência, policial ou de serviços sociais.

O Sistema permite o cadastro de usuários e de Instituições vinculadas que irão acompanhar o mesmo morador de rua.

Todo o layout e o respectivo CSS foi criado por mim do zero utilizando a técnica ITCSS para auxiliar na organização do código. Estou utilizando como auxilio o Normalize.

## Tecnologias Utilizadas

Neste projeto estão sendo utilizadas as seguintes tecnologias:

- NodeJS
- Express
- MongoDB (puro sem uso de ORM`s)
- EJS
- HTML5
- SASS
- Gulp
- Outras dependências

## Considerações Finais

Este projeto ainda não está finalizado e também não possui o seu escopo completamente fechado.

Algumas pendências principais:

1. Upload de Fotos não implementado
1. Autorização de Sessão não implementada
1. Tela de Administração não implementada
1. Tela edição de Instituição não implementada
1. Tela detalhada de Morador de Rua ainda não sincronizada com o Back-end
1. Layout mobile


Processos que estão funcionais:

1. CRUD Morador de Rua
1. CRUD Usuário
1. CRUD Instituição
1. Design
1. HTML e SASS
1. Integração tela principal com o bD
1. Integração formulário de cadastro com o bD
1. Integração formulário de cadastro de Instituição com o bD
1. Tela de Listagem de moradores de rua sincronizada com o Back-end
