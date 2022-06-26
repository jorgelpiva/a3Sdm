# Projeto de Avaliação A3 da Unidade Curricular de Sistemas Distribuídos e Mobile do Grupo Ânima Educação Modalidade Live

Este projeto é um trabalho dos alunos da Unidade Curricular de  Sistemas distribuídos e Mobile das Faculdades do Grupo Ânima na modalidade live 

Integrantes do Grupo:


Douglas da Silva Oliveira  - 322131950 

Larissa Martins de Souza Sampaio - 322112784 

Jorge Leandro Piva - 820268722 

Matheus Felipe de Assis Avelar Silva - 322115597 

Mateus Gomes Veloso – 322116316 

Matheus Mauricio Rodrigues da Silva - 52124299

Esta é uma API BACKEND 100% BackEnd, foi desenvolvida uma interface para ela como protótipo mas não houve tempo hábil para a integração, tanto a aplicação FrontEnd como a Backend estão finalizadas faltando apenas a integração, criação das funções e das requisições que irão ser enviadas ao BackEnd e o tratamento e visualização em tela do retorno no frontend.

OBS: O frontEnd em linguagem de programação é um Bônus Round da Unidade Curricular de Usabilidade, Design Web, Mobile e Jogos onde foi pedido apenas prototipação e na rodada bônus poderia ser usado linguagem de programação e tecnologia própria para aplicativos em produção.
O Link do FontEnd Está em : https://github.com/jorgelpiva/ux_ui_frontend

Esta API é o backEnd de um formulário para coleta de informações para acompanhamento de pacientes, projeto geral da Boston Scientific que criou uma parceria com o grupo Ânima e os requisitos específicos foram passados pelos alunos da área da saúde do grupo Ânima também.

Com a API é possível se cadastrar o sistema grava o password hash da pessoa por questão de segurança, é possível fazer a redefinição de senha por um token que tem tempo de expiração e é recebido por email, no frontend ele poderia integrar este token à uma pagina de redefinição de senha. 

Depois é possível se autenticar, a autenticação correta irá gerar um token que com ele é possível fazer operações de crud em seis formuários.

O usuário admin pode fazer uma requisição get na rota /report desde que autenticado e irá conseguir extrair todos os dados da base sempre que quiser.
Uma pessoa não pode se criar como usuário administrador este tipo de usuário deve ser feito direto na base.

Orientações Muito Importantes, este trabalho é acadêmico e não está em produção então para que ele funcione correntamente existem algumas informações dentro do gitignore caso ele seja clonado que precisam ser observados.

conteúdo do gitignore
node_modules - a pasta node módules é de praxe dos usuários de node a mesma é instalada pelo comando npm -i 
src/config - esta pasta possuí a configuração tanto do e-mail quanto do segredo da criptografia, obs apenas está sendo revelado pois não será colocado em produção, caso seja colocado em produção mudar de lugar o arquivo com o segredo.

Então desta forma, criar dentro da pasta src dois arquivos:

auth.json com o seguinte conteúdo:

{
    "secret": "insira o seu segredo"
}

mail.json com o seguinte conteúdo:
{
    "host": "insira o host (smtp)",
    "port": "insira a porta padrão de saída de email",
    "user": "insira o email do usuário",
    "pass": "insira a senha do email"
}

Após fazer estas configurações você precisa ter instalado localmente o mongodb em sua máquina para todas as funcionalidades funcionarem, a configuração do mongoDB está na pasta /src/database/index.js

Com a criação dos dois arquivos de configuração rodar o npm -i e instalação do mongoDB já é possível testar as requisições, como o frontend não foi desenvolvido será necessário o uso de um aplicativo como o insomnia ou o postman.

Todos os testes foram feitos diretamente no postman, inicialmente para criar um usuário:

O servidor é startado pelo comando npm start 
O mesmo irá iniciar o servidor utilizando o nodemon na porta 4000 ele também pode ser iniciado diretamente entrando na pasta src e rodando o comando node index.js

Na sequência faremos alguns testes:

Para se registrar enviar o seguinte comando neste caso utilizando o postman:

tipo da requisição: post
rota: http://localhost:4000/auth/register 
{
    "cpf": "000.000.000-05",
    "name": "testeReadMe",
    "email": "jorgepiva.8722@aluno.saojudas.br",
    "password": "123456"
}

Obtive o seguinte Retorno:

{
    "user": {
        "name": "testeReadMe",
        "cpf": "000.000.000-05",
        "email": "jorgepiva.8722@aluno.saojudas.br",
        "admin": false,
        "_id": "62b7bc04891839016316b64a",
        "createdAt": "2022-06-26T01:53:08.010Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjdiYzA0ODkxODM5MDE2MzE2YjY0YSIsImlhdCI6MTY1NjIwODM4OCwiZXhwIjoxNjU2MjExOTg4fQ.InW8y6c-QIte8XffvAFsoRIwFLB6MpLNZJMdjC7sfT8"
}

Com este token fornecido já é possível se autenticar, porém, vamos simular um processo de redefinição de senha.

De volta ao postman fazer a seguinte requisição:

tipo de requisição: post
Rota: http://localhost:4000/auth/forgot_password 
body: 

{
    "email": "jorgepiva.8722@aluno.saojudas.br"
}

Retorno: Ok

Ao checar minha caixa de entrada do meu email me deparo com a seguinte mensagem:

Email de Recuperação de Senha
Externa
Caixa de entrada
de: jorgedev@yahoo.com
	
23:12 (há 4 minutos)
	
para: mim

Você esqueceu sua senha? Não tem problema, utilize esse token: 41353eb935f948cefbd2ac3bf8b79ba26cb8204b 

Com este token iremos fazer uma nova requisição para trocar a senha conforme abaixo:


tipo de requisição: post
rota: http://localhost:4000/auth/reset_password

body: 
{
    "email": "jorgepiva.8722@aluno.saojudas.br",
    "token": "41353eb935f948cefbd2ac3bf8b79ba26cb8204b",
    "password": "abc"
}

para redefinição de senha não há retorno, agora podemos nos autenticar:

tipo de requisição: post
rota: http://localhost:4000/auth/authenticate 

body: 
{
    "email": "jorgepiva.8722@aluno.saojudas.br",
    "password": "abc"
}

esta autenticação me retorna os dados do usuário e o token conforme abaixo:

{
    "user": {
        "_id": "62b7bc04891839016316b64a",
        "name": "testeReadMe",
        "cpf": "000.000.000-05",
        "email": "jorgepiva.8722@aluno.saojudas.br",
        "admin": false,
        "createdAt": "2022-06-26T01:53:08.010Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjdiYzA0ODkxODM5MDE2MzE2YjY0YSIsImlhdCI6MTY1NjIxMDIyNSwiZXhwIjoxNjU2MjEzODI1fQ.LXxK2PfnHQEa_pHzIilXFYUrSKqgwQ6g_FzGZxkHTG8"
}

obs caso tente criar ou alterar um usuário admin não será possível porque no código existe a validação dele, o mesmo precisa ser criado direto na base de dados para dar acesso ao relatório geral

Com o token agora podemos fazer requisições nas diversas rotas que deveriam ser os formulários conforme abaixo:

Fazer o crud de um formulário de Dados Hospitalares:

tipo de requisição: post
rota: http://localhost:4000/dados-hospitalares/
authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjdiYzA0ODkxODM5MDE2MzE2YjY0YSIsImlhdCI6MTY1NjIxMDIyNSwiZXhwIjoxNjU2MjEzODI1fQ.LXxK2PfnHQEa_pHzIilXFYUrSKqgwQ6g_FzGZxkHTG8

body:
{
    "cpre" : true, 
    "bariatrica"  : true, 
    "medContinuo"   : true, 
    "medContinuoDesc" : "gardenal", 
    "alcoolismo" : true, 
    "alcoolismofreq" : "10xdia", 
    "fumante" : true, 
    "qtdCigarros" : 80, 
    "tpFumante" : 50, 
    "doencaPre" : true,  
    "qualDoencaPre" : "qualDoencaPre",  
    "calculoBiliar" : true
} 


O retorno dos dados do formulário indicam que a criação foi feita com sucesso:

{
    "frmDadosHosp": {
        "cpre": true,
        "bariatrica": true,
        "medContinuo": true,
        "medContinuoDesc": "gardenal",
        "alcoolismo": true,
        "alcoolismofreq": "10xdia",
        "fumante": true,
        "qtdCigarros": 80,
        "tpFumante": 50,
        "doencaPre": true,
        "qualDoencaPre": "qualDoencaPre",
        "calculoBiliar": true,
        "patient": "62b7bc04891839016316b64a",
        "_id": "62b7c43c891839016316b651",
        "createdAt": "2022-06-26T02:28:12.193Z",
        "__v": 0
    }
} 

vamos fazer agora uma alteração no formulário mudando o primeiro campo cpre para false 


tipo de requisição: put
rota: [http://localhost:4000/dados-hospitalares/]
authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjdiYzA0ODkxODM5MDE2MzE2YjY0YSIsImlhdCI6MTY1NjIxMDIyNSwiZXhwIjoxNjU2MjEzODI1fQ.LXxK2PfnHQEa_pHzIilXFYUrSKqgwQ6g_FzGZxkHTG8

body:
{
    "cpre" : false
}

Nesta requisição não houve o retorno então vamos fazer um get para verificar o que houve com o registro.

tipo de requisição: get
rota: http://localhost:4000/dados-hospitalares/62b7c43c891839016316b651
authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjdiYzA0ODkxODM5MDE2MzE2YjY0YSIsImlhdCI6MTY1NjIxMDIyNSwiZXhwIjoxNjU2MjEzODI1fQ.LXxK2PfnHQEa_pHzIilXFYUrSKqgwQ6g_FzGZxkHTG8


obtivemos o seguinte retorno:

{
    "frmDadosHosp": {
        "_id": "62b7c43c891839016316b651",
        "cpre": false,
        "bariatrica": true,
        "medContinuo": true,
        "medContinuoDesc": "gardenal",
        "alcoolismo": true,
        "alcoolismofreq": "10xdia",
        "fumante": true,
        "qtdCigarros": 80,
        "tpFumante": 50,
        "doencaPre": true,
        "qualDoencaPre": "qualDoencaPre",
        "calculoBiliar": true,
        "patient": {
            "_id": "62b7bc04891839016316b64a",
            "name": "testeReadMe",
            "cpf": "000.000.000-05",
            "email": "jorgepiva.8722@aluno.saojudas.br",
            "admin": false,
            "createdAt": "2022-06-26T01:53:08.010Z",
            "__v": 0
        },
        "createdAt": "2022-06-26T02:28:12.193Z",
        "__v": 0
    }
}

por fim se fizer uma requisição igualzinho foi feita a requisição get mas com o verbo delete você excluí o registro no formulário dados hospitalares:

tipo de requisição: delete
rota: http://localhost:4000/dados-hospitalares/62b7c43c891839016316b651
authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjdiYzA0ODkxODM5MDE2MzE2YjY0YSIsImlhdCI6MTY1NjIxMDIyNSwiZXhwIjoxNjU2MjEzODI1fQ.LXxK2PfnHQEa_pHzIilXFYUrSKqgwQ6g_FzGZxkHTG8

Lembrando que todas as requisições com exceção da register, forgot_password e authenticate devem ser feitas com o token do contrário ele irá apresentar erro.

A mecânica é identica para os demais formuários nas requisições post você só informa a rota e passa a autorização e os dados pelo body, na requisição put você informa a rota e o id do formulário pela url e passa os dados alterados pelo body, nas requisições get e delete, deve passar apenas a rota e o id do formuário pela url.

Abaixo as demais rotas: 

/feedback
/intercorrencias
/pos-cirurgico
/pre-cirurgico
/procedimento

Estes são os formulários que podem ser preenchidos além do cadastro do usuário que fizemos no começo e os dados hospitalares que foi o crud de exemplo.

Todo o projeto foi criado no padrão mvc, porém, o v de view ainda não foi integrado conforme citado anteriormente, porém, na pasta models temos toda a modelagem do banco de dados com a tipagem e os campos que serão inseridos, já na pasta controllers temos a implementação das funções de crud de cada model, nas pastas de model é possível ver os campos disponíveis para cadastro.

com o usuário admin é possível dar um get na rota /report e obter todos os dados do sistema para geração de relatórios segue:

Inicialmente vou autenticar com o usuário admin

tipo de requisição: post
rota: http://localhost:4000/auth/authenticate

body: {
    "email": "jorgedev@yahoo.com",
    "password": "admin"
}

Este é o único usuário admin em meu banco local hoje.

com o retorno: 

{
    "user": {
        "_id": "62a92c25abf4699118d009cd",
        "name": "admin",
        "cpf": "000.000.000-00",
        "email": "jorgedev@yahoo.com",
        "admin": true,
        "createdAt": "2022-06-15T00:47:33.798Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYTkyYzI1YWJmNDY5OTExOGQwMDljZCIsImlhdCI6MTY1NjIxMTgyMSwiZXhwIjoxNjU2MjE1NDIxfQ.IJ17qkOmhJHSo6g1JzxnZUvnBtx7KizaDO9SUpvc7mM"
}

vamos utilizar o token na requisição get do report

tipo de requisição: get
rota: http://localhost:4000/report
authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYTkyYzI1YWJmNDY5OTExOGQwMDljZCIsImlhdCI6MTY1NjIxMTgyMSwiZXhwIjoxNjU2MjE1NDIxfQ.IJ17qkOmhJHSo6g1JzxnZUvnBtx7KizaDO9SUpvc7mM

retorno: 

{
    "dados": {
        "pacientes": [
            {
                "_id": "62a7cb403d3543826a42ebc5",
                "name": "jorgedevs",
                "email": "jorgelpiva@gmail.com",
                "admin": false,
                "createdAt": "2022-06-13T23:41:52.757Z",
                "__v": 0
            },
            {
                "_id": "62a92c25abf4699118d009cd",
                "name": "admin",
                "cpf": "000.000.000-00",
                "email": "jorgedev@yahoo.com",
                "admin": true,
                "createdAt": "2022-06-15T00:47:33.798Z",
                "__v": 0
            },
            {
                "_id": "62b7bc04891839016316b64a",
                "name": "testeReadMe",
                "cpf": "000.000.000-05",
                "email": "jorgepiva.8722@aluno.saojudas.br",
                "admin": false,
                "createdAt": "2022-06-26T01:53:08.010Z",
                "__v": 0
            }
        ],
        "dadosHosp": [
            {
                "_id": "62a7e984a63355934569373d",
                "cpre": true,
                "bariatrica": true,
                "medContinuo": true,
                "medContinuoDesc": "gardenal",
                "alcoolismo": true,
                "alcoolismofreq": "10xdia",
                "fumante": true,
                "qtdCigarros": 80,
                "tpFumante": 50,
                "doencaPre": true,
                "qualDoencaPre": "qualDoencaPre",
                "calculoBiliar": true,
                "patient": "62a7cb403d3543826a42ebc5",
                "createdAt": "2022-06-14T01:51:00.074Z",
                "__v": 0
            },
            {
                "_id": "62a91ccd400005fb5504ac0e",
                "patient": "62a7cb403d3543826a42ebc5",
                "createdAt": "2022-06-14T23:42:05.780Z",
                "__v": 0
            },
            {
                "_id": "62a91d03400005fb5504ac10",
                "patient": "62a7cb403d3543826a42ebc5",
                "createdAt": "2022-06-14T23:42:59.389Z",
                "__v": 0
            },
            {
                "_id": "62b7c43c891839016316b651",
                "cpre": false,
                "bariatrica": true,
                "medContinuo": true,
                "medContinuoDesc": "gardenal",
                "alcoolismo": true,
                "alcoolismofreq": "10xdia",
                "fumante": true,
                "qtdCigarros": 80,
                "tpFumante": 50,
                "doencaPre": true,
                "qualDoencaPre": "qualDoencaPre",
                "calculoBiliar": true,
                "patient": "62b7bc04891839016316b64a",
                "createdAt": "2022-06-26T02:28:12.193Z",
                "__v": 0
            }
        ],
        "frmFeedback": [
            {
                "_id": "62a924c02f92049579286e01",
                "orientPosOp": true,
                "repouso": true,
                "dieta": true,
                "retornMed": true,
                "outros": true,
                "sentePreOp": "foi",
                "sugest": "alterado",
                "patient": "62a7cb403d3543826a42ebc5",
                "createdAt": "2022-06-15T00:16:00.790Z",
                "__v": 0
            }
        ],
        "frmInterCorrencia": [
            {
                "_id": "62a924c02f92049579286e01",
                "orientPosOp": true,
                "repouso": true,
                "dieta": true,
                "retornMed": true,
                "outros": true,
                "sentePreOp": "foi",
                "sugest": "alterado",
                "patient": "62a7cb403d3543826a42ebc5",
                "createdAt": "2022-06-15T00:16:00.790Z",
                "__v": 0
            }
        ],
        "frmPosCirurgico": [
            {
                "_id": "62a920600825a7e6b5795d4f",
                "acompPos": true,
                "examPos": true,
                "sangue": true,
                "image": true,
                "outros": true,
                "observ": "alterei",
                "patient": "62a7cb403d3543826a42ebc5",
                "createdAt": "2022-06-14T23:57:20.472Z",
                "__v": 0
            }
        ],
        "frmPreCirurgico": [
            {
                "_id": "62a91e48947377c4188c528c",
                "acompPre": true,
                "examPre": true,
                "sangue": true,
                "image": true,
                "outros": true,
                "observ": "String",
                "patient": "62a7cb403d3543826a42ebc5",
                "createdAt": "2022-06-14T23:48:24.385Z",
                "__v": 0
            },
            {
                "_id": "62a91e9f947377c4188c528e",
                "acompPre": true,
                "examPre": true,
                "sangue": true,
                "image": true,
                "outros": true,
                "observ": "String",
                "patient": "62a7cb403d3543826a42ebc5",
                "createdAt": "2022-06-14T23:49:51.511Z",
                "__v": 0
            },
            {
                "_id": "62a91ea6947377c4188c5290",
                "acompPre": true,
                "examPre": true,
                "sangue": true,
                "image": true,
                "outros": true,
                "observ": "String",
                "patient": "62a7cb403d3543826a42ebc5",
                "createdAt": "2022-06-14T23:49:58.444Z",
                "__v": 0
            }
        ],
        "frmProcedimento": [
            {
                "_id": "62a91d16400005fb5504ac12",
                "numeroProtocolo": 123,
                "nomeHospital": "nomeHospital",
                "nomeMedico": "nomeMedico",
                "crmMedico": "crmMedico",
                "dtRealizacao": "2022-06-14T23:34:32.960Z",
                "modoRealizado": "modoRealizado",
                "patient": "62a7cb403d3543826a42ebc5",
                "createdAt": "2022-06-14T23:43:18.784Z",
                "__v": 0
            }
        ]
    }
}
