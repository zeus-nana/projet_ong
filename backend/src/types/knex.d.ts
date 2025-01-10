import { Knex } from 'knex'
import { IUser, IUserCreationAttributes, IUserUpdateAttributes } from '../modules/users/interfaces/user.interface'

declare module 'knex/types/tables' {
    interface Tables {
        // La table users définit à la fois la structure et les types pour les opérations
        users: IUser & {
            // Types pour les opérations d'insertion
            insert: IUserCreationAttributes
            // Types pour les opérations de mise à jour
            update: IUserUpdateAttributes
        }
    }
}
