# Friendshit (Backend)

Vanilla Express.js backend


### Team Members
|Name|Role|Student ID|
|---|---|---|
|[Tharathorn Bunrattanasathian](https://github.com/th-bunratta)|Frontend, Backend Developer|6110546011|
|[Sirawich Direkwattanachai](https://github.com/magmagcup)|Backend Developer|6110546054|
|[Chayathon Khuttiyanon](https://github.com/plumest)|Frontend, Backend Developer|6110546381|


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

### Sub-projects
- [Friendshit: Backend](api/README.md) (Express.js)
