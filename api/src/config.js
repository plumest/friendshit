import dotenv from "dotenv";

dotenv.config()

const config = {
    whitelistUrls: process.env.ORIGIN_WHITELIST_URLS.split(','),
    environment: process.env.NODE_ENV,
    baseUrl: process.env.BASE_URL || 'localhost',
    port: process.env.PORT || 3000,
    saltingRounds: 12,
    connUri: process.env.MONGO_LOCAL_CONN_URL,
    jwtSecret: process.env.JWT_SECRET || 'secret',
    logLevel: process.env.LOG_LEVEL || 'silly'
}

export default config
