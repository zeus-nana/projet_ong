import type { Knex } from 'knex';
import { onUpdateTrigger } from '../../../knexfile';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('vendors', (table) => {
        table.increments('id').primary();
        table.string('name', 255).notNullable().unique();
        table.string('address', 255);
        table.string('phone', 50);
        table.string('email', 255);
        table.string('registration_number', 100);
        table.string('account_number', 100);
        table.string('service_type', 100).notNullable();
        table.integer('created_by').unsigned().notNullable().references('id').inTable('users');
        table.integer('updated_by').unsigned().references('id').inTable('users');
        table.timestamps(true, true);
    });

    return knex.raw(onUpdateTrigger('vendors'));
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('vendors');
}