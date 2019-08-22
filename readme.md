# Teste backend Foregon

API para solicitação de cartões de crédito. Existe dois endpoints para a solicitação de cartão, em /partial pode-se enviar a socicitação parcialmente, ou seja, primeiro o nome, depois e-mail, e assim por diante. Quando o usuário terminar de preencher toda a proposta e aceitar os termos, envia os dados para o endpoint /final.


## Instalação e execução do projeto

**Instalar as dependências**

```npm install```

**Executar projeto**

```npm start```

**Executar em modo de desenvolvimento**

```npm run dev```

**Executar os testes**

```npm run test```

## Códigos de status

A API retorna os seguintes códigos de status:

| Códigos | Descrição |
| :--- | :--- |
| 200 | `OK` |
| 201 | `CRIADO` |
| 400 | `REQUISIÇÃO ERRADA` |
| 401 | `NÃO AUTORIZADO` |
| 500 | `ERRO INTERNO` |

## Registro

Para realizar requisições na API é necessário ter autorização. Para isso é necessário se registrar na API, basta realizar um `POST` em /register.

+ `POST` - Request

```javascript
{
  "name" : "admin",
  "email" : "admin@admin.com",
  "senha" : "123"
}
```

+ Response

```javascript
{
  "success": true,
  "title": "Usuário criado com sucesso.",
  "token": "seu_token_aqui",
  "status": 201
}
```

## Autenticação

Para realizar requisições na API é necessário ter o token de acesso. Para obter o token é necessário se autenticar na API, basta realizar um `POST` em /authenticate.

+ `POST` - Request

```javascript
{
  "email" : "admin@admin.com",
  "senha" : "123"
}
```

+ Response

```javascript
{
  "success": true,
  "title": "Usuário autenticado com sucesso.",
  "token": "seu_token_aqui",
  "status": 200
}
```

Na resposta se recebe o `token` que será utilizado no cabeçalho das próximas requisições, desta forma:

```javascript
"Authorization": "Bearer seu_token_aqui",
```



## Partial

Nesse endpoint envia a solicitação parcialmente, e a API retorna um token, para que possa ser atualizado esses dados posteriormente.

+ `POST` - Request

```javascript
{
  "name" : "Leonardo"
}
```

+ Response

```javascript
{
  "success": true,
  "token": "5d55d8a56dfb792854f7d681",
  "title": "Salvo com sucesso.",
  "status": 201
}
```

Em seguida, pode enviar uma nova requisição, agora utilizando o token recebido na resposta, para atualizar a sua solicitação.

+ `POST` - Request

```javascript
{
  "token": "5d55d8a56dfb792854f7d681",
  "name" : "Leonardo"
}
```

+ Response

```javascript
{
  "success": true,
  "token": "5d55d8a56dfb792854f7d681",
  "title": "Atualizado com sucesso.",
  "status": 200
}
```


## Final

Esse endpoint recebe a solicitação completa, ou seja com todos os campos. A API valida todos os campos, caso os esteja tudo certo, essa solicitação altera seu status para solicitação completa.

+ `POST` - Request

```javascript
{
  "token": "5d55d8a56dfb792854f7d681",
  "product" : 1,
  "name" : "Leonardo",
  "email" : "leonardo@hotmail.com",
  "cpf": "91577748034",
  "birthdate" : "1995-02-17",
  "phone" : "18 1234-5678"
}
```

+ Response

```javascript
{
  "success": true,
  "token": "5d55d8a56dfb792854f7d681",
  "title": "Solicitação criada com sucesso.",
  "status": 201
}
```

## Erros

Erro de validação, ao fazer uma requisição com algum campo inválido, por exemplo, o `name`, a API na resposta retorna um objeto `errors` com os erros de validação.

+ `POST` - Request

```javascript
{
  "name" : "Leo"
}
```

+ Response

```javascript
{
  "success": false,
  "title": "Erro na validação de um ou mais campos.",
  "status": 400,
  "errors": {
    "name": [
      "Nome deve ter pelo menos 5 caracteres."
    ],
  }
}
```

Erro na regra de negócio, exemplo, um mesmo CPF não pode ter uma nova proposta por 90 dias. Então a API retorna uma resposta de erro com a descrição do erro ocorrido.

+ `POST` - Request

```javascript
{
  "product" : 1,
  "name" : "Leonardo",
  "email" : "leonardo@hotmail.com",
  "cpf": "91577748034",
  "birthdate" : "1995-02-17",
  "phone" : "18 1234-5678"
}
```

+ Response

```javascript
{
  "success": false,
  "title": "Um mesmo CPF não pode ter uma nova proposta por 90 dias.",
  "status": 400,
  "errors": []
}
```