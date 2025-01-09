import type { Knex } from 'knex'
import { onUpdateTrigger } from '../../../knexfile'

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('workshop_participants', (table) => {
        table.increments('id').primary()
        table.integer('workshop_id').unsigned().notNullable().references('id').inTable('workshops').onDelete('CASCADE')
        table.string('first_name', 255).notNullable()
        table.string('last_name', 255).notNullable()
        table.string('role', 100)
        table.string('city_origin', 255)
        table.decimal('transport_amount', 15, 2).defaultTo(0)
        table.decimal('dsa_amount', 15, 2).defaultTo(0)
        table.decimal('perdiem_amount', 15, 2).defaultTo(0)
        table.string('phone', 50)
        table.string('email', 255)
        table.text('notes')
        table.boolean('is_present').defaultTo(false)
        table.integer('created_by').unsigned().notNullable().references('id').inTable('users')
        table.integer('updated_by').unsigned().references('id').inTable('users')
        table.timestamps(true, true)
    })

    // Contraintes sur les montants qui doivent être >= 0
    await knex.raw(`
    ALTER TABLE workshop_participants 
    ADD CONSTRAINT check_transport_amount_positive 
    CHECK (transport_amount >= 0)
  `)

    await knex.raw(`
    ALTER TABLE workshop_participants 
    ADD CONSTRAINT check_dsa_amount_positive 
    CHECK (dsa_amount >= 0)
  `)

    await knex.raw(`
    ALTER TABLE workshop_participants 
    ADD CONSTRAINT check_perdiem_amount_positive 
    CHECK (perdiem_amount >= 0)
  `)

    return knex.raw(onUpdateTrigger('workshop_participants'))
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('workshop_participants')
}
