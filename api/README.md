# Friendshit (Backend)

Vanilla Express.js backend

### Configuration
Please create `.env` file before running.
See `.env.default` for example.

These are environment variables required.

|Name|Description|Default value|
|---|---|---|
|`LOG_LEVEL`|The log level used by **winston**|`silly`|
|`PORT`|The exposed port by the server|`8090`|
|`MONGO_LOCAL_CONN_URL`|The MongoDB database connection string|prefixed by `mongodb+srv://` or  `mongodb://`|

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
