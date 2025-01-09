import type { Knex } from 'knex'
import { onUpdateTrigger } from '../../../knexfile'

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('project_funders', (table) => {
        table.increments('id').primary()
        table.integer('project_id').unsigned().notNullable().references('id').inTable('projects').onDelete('CASCADE')
        table.integer('funder_id').unsigned().notNullable().references('id').inTable('funders').onDelete('CASCADE')
        table.decimal('amount', 15, 2)
        table.integer('created_by').unsigned().notNullable().references('id').inTable('users')
        table.integer('updated_by').unsigned().references('id').inTable('users')
        table.timestamps(true, true)
    })

    return knex.raw(onUpdateTrigger('project_funders'))
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('project_funders')
}
