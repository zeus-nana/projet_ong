import type { Knex } from 'knex'
import { onUpdateTrigger } from '../../../knexfile'

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('funding', (table) => {
        table.increments('id').primary()
        table.integer('vendor_id').unsigned().notNullable().references('id').inTable('vendors').onDelete('RESTRICT')
        table.integer('project_id').unsigned().notNullable().references('id').inTable('projects').onDelete('RESTRICT')
        table.decimal('amount', 15, 2).notNullable()
        table.date('payment_date').notNullable()
        table.integer('created_by').unsigned().notNullable().references('id').inTable('users')
        table.integer('updated_by').unsigned().references('id').inTable('users')
        table.timestamps(true, true)
    })

    // Contrainte sur le montant positif
    await knex.raw(`
    ALTER TABLE funding 
    ADD CONSTRAINT check_funding_amount_positive 
    CHECK (amount > 0)
  `)

    // Contrainte sur la date de paiement qui ne peut pas être dans le futur
    await knex.raw(`
    ALTER TABLE funding 
    ADD CONSTRAINT check_payment_date_not_future 
    CHECK (payment_date <= CURRENT_DATE)
  `)

    return knex.raw(onUpdateTrigger('funding'))
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('funding')
}
