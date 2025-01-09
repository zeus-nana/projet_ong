import type { Knex } from 'knex'
import { onUpdateTrigger } from '../../../knexfile'

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('document_reference', (table) => {
        table.increments('id').primary()
        table.integer('document_id').unsigned().notNullable().references('id').inTable('documents').onDelete('CASCADE')
        table.string('entity_type', 50).notNullable()
        table.integer('entity_id').notNullable()
        table.integer('created_by').unsigned().notNullable().references('id').inTable('users')
        table.integer('updated_by').unsigned().references('id').inTable('users')
        table.timestamps(true, true)

        // Index composite pour accélérer les recherches par entité
        table.index(['entity_type', 'entity_id'])
    })

    return knex.raw(onUpdateTrigger('document_reference'))
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('document_reference')
}
