import type { Knex } from 'knex'
import { onUpdateTrigger } from '../../../knexfile'

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('expenses', (table) => {
        table.increments('id').primary()
        table.integer('workshop_id').unsigned().references('id').inTable('workshops').onDelete('CASCADE')
        table.string('expense_type', 50).notNullable()
        table.string('category', 50).notNullable()
        table.integer('vendor_id').unsigned().notNullable().references('id').inTable('vendors').onDelete('RESTRICT')
        table.decimal('amount', 15, 2).notNullable()
        table.integer('funding_id').unsigned().references('id').inTable('funding').onDelete('RESTRICT')
        table.string('status', 20).notNullable().defaultTo('DRAFT')
        table.integer('validated_by').unsigned().references('id').inTable('users')
        table.date('validated_at')
        table.integer('created_by').unsigned().notNullable().references('id').inTable('users')
        table.integer('updated_by').unsigned().references('id').inTable('users')
        table.timestamps(true, true)
    })

    // Contraintes sur la catégorie et le workshop_id
    await knex.raw(`
    ALTER TABLE expenses 
    ADD CONSTRAINT check_expense_category_workshop 
    CHECK (
      (category = 'WORKSHOP' AND workshop_id IS NOT NULL) OR 
      (category = 'GENERAL' AND workshop_id IS NULL)
    )
  `)

    // Contrainte sur le statut
    await knex.raw(`
    ALTER TABLE expenses 
    ADD CONSTRAINT check_expense_status 
    CHECK (status IN ('DRAFT', 'PENDING', 'APPROVED', 'REJECTED'))
  `)

    // Contrainte sur le montant positif
    await knex.raw(`
    ALTER TABLE expenses 
    ADD CONSTRAINT check_expense_amount_positive 
    CHECK (amount > 0)
  `)

    // Contrainte sur validated_at et validated_by
    await knex.raw(`
    ALTER TABLE expenses 
    ADD CONSTRAINT check_expense_validation 
    CHECK (
      (status IN ('APPROVED', 'REJECTED') AND validated_by IS NOT NULL AND validated_at IS NOT NULL) OR
      (status IN ('DRAFT', 'PENDING') AND validated_by IS NULL AND validated_at IS NULL)
    )
  `)

    return knex.raw(onUpdateTrigger('expenses'))
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('expenses')
}
