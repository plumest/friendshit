import dotenv from "dotenv";

dotenv.config()

const config = {
    environment: process.env.NODE_ENV,
    baseUrl: process.env.BASE_URL || 'localhost',
    port: process.env.PORT || 3000,
    saltingRounds: 12,
    connUri: process.env.MONGO_LOCAL_CONN_URL
}

export default config;