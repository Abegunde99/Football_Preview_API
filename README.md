## FOOTBALL PREVIEW API

Football Preview  Api is an open source backend that can be deployed to any infrastructure that can run Node.js. Parse Server works with the Express web application framework.

#DOCUMENTATION
https://documenter.getpostman.com/view/21616732/2s93sgWW7A#32a74f02-5444-4665-bdb2-0bf206fb0afe

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

- Generate Standings of the Premier League, Championship, League One and League Two from an external api.
- Generate Fixtures of the Premier League, Championship, League One and League Two from an external api.
- Use the generated standings and fixtures to create an api that can be use to get the standings and fixtures of the Premier League, Championship, League One and League Two using different search queries.
- Create articles for each match fixtures, articles can be created, updated, deleted and retrieved, articles can only be created by admins.
- Create users, users can be created, updated, deleted and retrieved, users can only be created by admins.
- users get a token when they login, the token is use to authenticate the user when they want to create, update or delete an article.
- users also get otp when they want to reset their password, the otp is use to authenticate the user when they want to reset their password.

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