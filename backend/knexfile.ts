import path from 'path'
import { Knex } from 'knex'
import appConfig from './src/config'

export default {
    development: {
        client: 'postgresql',
        connection: {
            host: appConfig.db.host,
            port: appConfig.db.port,
            user: appConfig.db.user,
            password: appConfig.db.password,
            database: appConfig.db.database,
        },

        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
            tableName: 'knex_migrations',
        },
        seeds: {
            directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
        },
        useNullAsDefault: true,
    },

    staging: {
        client: 'postgresql',
        connection: {
            database: appConfig.db.database,
            user: appConfig.db.user,
            password: appConfig.db.password,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
        },
        seeds: {
            directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
        },
        useNullAsDefault: true,
    },

    production: {
        client: 'postgresql',
        connection: {
            database: appConfig.db.database,
            user: appConfig.db.user,
            password: appConfig.db.password,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
        },
        seeds: {
            directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
        },
        useNullAsDefault: true,
    },
}

export const onUpdateTrigger = (table: string) => `
  CREATE TRIGGER ${table}_updated_at
  BEFORE UPDATE ON ${table}
  FOR EACH ROW
  EXECUTE PROCEDURE on_update_timestamp();
`
