# Database

Utilizado ORM: TypeORM para manipulação do banco de dados postgres
TypeORM tem suporte a varios bancos de dados como: postgres, mysql, oracle, sqlite
Para cada utilização do TypeORM deve ser instalado o drive do db que será utilizado no projeto

Ex: yarn add typeorm pg
pg = drive do postgres

Para a configuração do TypeORM é criado na raiz do projeto um arquivo json com o nome de ormconfig.json que será
informado as configurações do banco de dados que será utilizado. verificar na documentação

Exemplo:

{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": "valhalla",
  "database": "gobarber",
  "migrations": [
		"./src/database/migrations/*.ts"
	],
	"cli": {
		"migrationsDir": "./src/database/migrations"
	}
}

Para a criação das migrations é adicionado em ormconfig.json duas configurações: migrations e cli onde:
cli é informado o caminho onde será criada as migrations
migrations é informado o caminho das migrations + o tipo de arquivo das migrations criadas.

Além dessas configurações é fundamental a criação do script em package.json para a criação das migrations. embora sem criar o script é
possivel rodar no terminal yarn tyorm será mostrado comandos do tyorm, pois o mesmo é uma cli, não será gerados arquivos do tipo ts
então é criado o atalho em srcipts em package.json

"typeorm": "ts-node-dev ./node_modules/typeorm/cli.js"

Com isso, ao rodar yarn typeorm migration:create -n NomeMigration, o arquivo gerado terá  o formato ts


Para criar a conexão com o banco de dados e chamar as configurações criadas do ormconfig.json, foi criado um arquivo index.ts em database

Exemplo:
import { createConnection } from 'typeorm';

createConnection();


o metodo createConnection pega automaticamente as configurações de ormconfig.json
Para finalizar é fundamental importar o arquivo index.ts no server.ts

Exemplo:
import './database';

Devido o arquivo ser com o nome index não precisa passar './database/index.ts';


Para a criação de tabelas, colunas etc, verificar a documentação

Na migration CreateAppointments foi criado uma coluna do tipo timestamp with time zone, esse tipo só existe no postgres
caso não utilize postgres alterar para timestamp


Executar migrations
yarn typeorm migration:run
