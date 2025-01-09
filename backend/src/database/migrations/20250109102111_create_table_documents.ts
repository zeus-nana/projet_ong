import type { Knex } from 'knex';
import { onUpdateTrigger } from '../../../knexfile';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('documents', (table) => {
        table.increments('id').primary();
        table.string('type', 100).notNullable();
        table.string('file_path', 255).notNullable();
        table.string('version', 50);
        table.string('status', 50);
        table.integer('created_by').unsigned().notNullable().references('id').inTable('users');
        table.integer('updated_by').unsigned().references('id').inTable('users');
        table.timestamps(true, true);
    });

    return knex.raw(onUpdateTrigger('documents'));
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('documents');
}