# Friendshit (Backend)

Vanilla Express.js backend

### Configuration
Please create `.env` file before running.
See `.env.default` for example.

These are environment variables required.

|Name|Description|Default value|
|---|---|---|
|`BASE_URL`|The base URL for this API|`localhost`|
|`PORT`|The exposed port by the server|`8090`|
|`LOG_LEVEL`|The log level used by **winston**|`silly`|
|`JWT_SECRET`|The JWT secret|`secret`|
|`MONGO_LOCAL_CONN_URL`|The MongoDB database connection string|prefixed by `mongodb+srv://` or  `mongodb://`|
|`ORIGIN_WHITELIST_URLS`|The whitelist URLs that was allow to send HTTP methods to APIs|`['http://localhost:3000', 'http://localhost:8091']`|

## Project setup
```
yarn install
```
You can then run your project with the command `npm run dev` in development enviroment

### Compiles and hot-reloads for development
```
yarn dev
```

### Compiles and minifies for production
```
yarn build
```
