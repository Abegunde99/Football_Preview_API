## FOOTBALL PREVIEW API

Football Preview  Api is an open source backend that can be deployed to any infrastructure that can run Node.js. Parse Server works with the Express web application framework.

# Table OF content

- Description
- Usage
- Instruction
- Requirement
- Poject tree

# Description

Football Preview  Api is an open source backend that can be deployed to any infrastructure that can run Node.js. Parse Server works with the Express web application framework.

# Usage

It is use for the following

- Generate Standings of the Premier League, Championship, League One and League Two from an external api
- Generate Fixtures of the Premier League, Championship, League One and League Two from an external api

# Instruction

Before you start make sure you have installed:

NodeJS that includes npm

### `Download the project to Your Pc`

having the project in ur local environment

```

git clone <Repository Url>

# or

git pull  <Repository Url>


```

### `Installing npm package`

installing all the requires npm packages

```

npm install

# or

yarn install

```

### `Environment variable`

```

check the sample.env to get the list of the variable in  .env file
requires for this server to run successfully

```

### `Start the Server`

Running the server on your local environment

```
npm run start

# or

yarn run start

```

# Description

The following are the requirement for the project

- Node install in the Pc
-Obtain all variables in the sample.env file and create a .env file
for the project
-Run the project on your local environment


# Project Tree

```
├── README.md
├── app.js
├── controllers
│   ├── fixtures-controller.js
|   ├── standings-controller.js
├── models
│   ├── Fixtures.js
|   ├── Standings.js
|   ├── index.js
├── package.json
├── package-lock.json
├── routes
│   ├── fixtures.js
|   ├── standings.js
|-- repository
|   ├── fixtures-repository.js
|   ├── standings-repository.js
├── services
│   ├── fixtures-service.js
|   ├── standings-service.js
├── utils
│   ├── cron.js
|   ├── errorResponse.js
|   ├── externalApi.js
|-- middlewares
|   ├── error.js
|-- config
|   ├── connection.js
|   
|── server.js
├── sample.env