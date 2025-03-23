import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('vendors', (table) => {
        table.string('code', 50).after('name').unique()
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('vendors', (table) => {
        table.dropColumn('code')
    })
}
