const keys = {
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    POSTGRES_HOST: process.env.PGHOST,
    POSTGRES_PORT: process.env.PGPORT,
    POSTGRES_USERNAME: process.env.PGUSER,
    POSTGRES_PASSWORD: process.env.PGPASSWORD,
    POSTGRES_DB: process.env.PGDATABASE
}

module.exports = keys;