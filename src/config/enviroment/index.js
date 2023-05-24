import dotenv from "dotenv";
dotenv.config();

export const EnviromentConnection = {
  rethinkdb: {
    host: process.env.RETHINK_DB_HOST,
    port: process.env.RETHINK_DB_PORT,
    password: process.env.RETHINK_DB_PASSWORD,
    db: process.env.RETHINK_DB_DB,
    tableName: process.env.RETHINK_DB_TABLE_NAME,
  },
  postgres: {
    host: process.env.POSTGRES_DATABASE_HOST,
    port: process.env.POSTGRES_DATABASE_PORT,
    user: process.env.POSTGRES_DATABASE_USER,
    password: process.env.POSTGRES_DATABASE_PASSWORD,
    db: process.env.POSTGRES_DATABASE_DB,
  },
  port: process.env.PORT_APP,
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
};
