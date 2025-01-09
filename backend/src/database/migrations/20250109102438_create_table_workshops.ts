import type { Knex } from 'knex'
import { onUpdateTrigger } from '../../../knexfile'

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('workshops', (table) => {
        table.increments('id').primary()
        table.string('name', 500).notNullable()
        table.integer('project_id').unsigned().notNullable().references('id').inTable('projects').onDelete('CASCADE')
        table.string('theme', 255)
        table.string('location', 255)
        table.date('start_date').notNullable()
        table.date('end_date')
        table.boolean('is_closed').notNullable().defaultTo(false)
        table.integer('closed_by').unsigned().references('id').inTable('users')
        table.integer('created_by').unsigned().notNullable().references('id').inTable('users')
        table.integer('updated_by').unsigned().references('id').inTable('users')
        table.timestamps(true, true)
    })

    // Ajout des contraintes CHECK avec raw SQL
    await knex.raw(`
    ALTER TABLE workshops 
    ADD CONSTRAINT check_workshop_dates 
    CHECK (end_date IS NULL OR end_date > start_date)
  `)

    await knex.raw(`
    ALTER TABLE workshops 
    ADD CONSTRAINT check_workshop_closed_by 
    CHECK (NOT is_closed OR closed_by IS NOT NULL)
  `)

    await knex.raw(`
    ALTER TABLE workshops 
    ADD CONSTRAINT check_workshop_closed_date 
    CHECK (NOT is_closed OR end_date IS NOT NULL)
  `)

    return knex.raw(onUpdateTrigger('workshops'))
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('workshops')
}
