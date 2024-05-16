# Resolução do Teste

## 1.1 - Setup

Primeiramente visualizei o dataset em csv e transformeio de forma a ser um ficheiro json.
Para isso utilizei csvtojson.py com o seguinte comando

$ python3 csvtojson.py

Agora com o dataset em formato json fiz a persistência da base de dados. Esta foi efetuada através do mongoDB, recorrendo aos seguintes comandos:

$ docker cp contratos2024.json mongoEW:/tmp
$ docker exec -it mongoEW bash
$ mongoimport -d contratos -c contratos /tmp/contratos2024.json --jsonArray

Estes comandos criam a base de dados "contratos" com uma coleção "contratos", a partir do ficheiro "contratos2024.json"

A alteração que achei útil fazer foi alterar o nome do atributo "idcontrato" para o nome "_id" que é o esperado pelo MongoDB.

Para fazer esta alteração utilizei o comando CTRL+F do VSCode e a partir de uma expressão regular substitui todas as ocorrências de ("idcontrato") para ("_id").

Também alterei os campos idcontrato, precoContratual e prazoExecucao para exprimirem concretamente int, float e int para melhor análise e utilização.

Confirmando se está tudo certo:
root@5e7773037149:/# mongoimport -d contratos -c contratos /tmp/contratos2024.json --jsonArray
2024-05-16T13:18:47.808+0000    connected to: mongodb://localhost/
2024-05-16T13:18:48.668+0000    36377 document(s) imported successfully. 0 document(s) failed to import.

## 1.2 - Queries
As queries estão presentes no ficheiro queries.txt dentro da pasta ex1

## 1.3 API de dados

Para a api de dados usei o seguinte comando que cria uma diretoria base para a API:
$ npx express-generator --no-view ex1

Posteriormente adicionei as pastas models e controllers de forma a desenvolver a API pedida.

No desenvolvimento, para GET /contratos?entidade=EEEE, optei por usar NIPC_entidade_comunicante, de forma a posteriormente na fase da interface seja mais fácil o acesso à mesma.

Também possui o seguinte módulo:
$ npm i mongoose --save

Para correr a aplicação apenas, é preciso estar na diretoria "ex1" e correr os comandos:
$npm i
$npm start

Estes irão iniciar o servidor na porta 16000

## Interface

Para a interface utilizei o mesmo comando anteriormente utilizado, mas desta vez com a flag: --view=pug
$ npx express-generator --view=pug ex2

Para utilizar os dados da API feita utilizei o módulo axios:
$ npm i axios --save

Para correr a aplicação, tem de se estar na diretoria "ex2" e utilizar os seguintes comandos:
$npm i
$npm start

Estes irão iniciar o serviço, e ficarão à espera de pedidos na porta 16001.

## Distribuição das aplicações

Tanto para a API como para a interface foi criado um Dockerfile dentro de cada diretoria.

O modelo do Dockerfile é o seguinte:
FROM node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE port

CMD [ "npm", "start" ]

Onde o port é modificado para 16000 ou 16001, dependendo se é ex1 ou ex2

Posteriormente foi feito um docker-compose.yml para rodar tudo:

$ docker compose up -d

Para rodar com docker é só preciso substituir na app.js do ex1 o 127.0.0.1 por engweb2024-normal-mongodb-1
Caso contrário pode utilizar rodando somente npm start em ambas as pastas