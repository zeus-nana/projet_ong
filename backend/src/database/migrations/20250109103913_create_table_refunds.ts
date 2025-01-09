import type { Knex } from 'knex'
import { onUpdateTrigger } from '../../../knexfile'

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('refunds', (table) => {
        table.increments('id').primary()
        table.integer('vendor_id').unsigned().notNullable().references('id').inTable('vendors').onDelete('RESTRICT')
        table
            .integer('funding_id')
            .unsigned()
            .notNullable()
            .unique() // Un seul remboursement par funding
            .references('id')
            .inTable('funding')
            .onDelete('RESTRICT')
        table.decimal('amount', 15, 2).notNullable()
        table.date('received_date').notNullable()
        table.integer('created_by').unsigned().notNullable().references('id').inTable('users')
        table.integer('updated_by').unsigned().references('id').inTable('users')
        table.timestamps(true, true)
    })

    // Contrainte sur le montant positif
    await knex.raw(`
    ALTER TABLE refunds 
    ADD CONSTRAINT check_refund_amount_positive 
    CHECK (amount > 0)
  `)

    // Contrainte sur la date de réception qui ne peut pas être dans le futur
    await knex.raw(`
    ALTER TABLE refunds 
    ADD CONSTRAINT check_received_date_not_future 
    CHECK (received_date <= CURRENT_DATE)
  `)

    return knex.raw(onUpdateTrigger('refunds'))
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('refunds')
}
