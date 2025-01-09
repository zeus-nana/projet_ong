import type { Knex } from 'knex';
import { onUpdateTrigger } from '../../../knexfile';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('projects', (table) => {
        table.increments('id').primary();
        table.string('name', 255).notNullable().unique();
        table.text('description');
        table.string('type', 100);
        table.date('start_date').notNullable();
        table.date('end_date');
        table.boolean('is_closed').notNullable().defaultTo(false);
        table.integer('closed_by').unsigned().references('id').inTable('users');
        table.integer('created_by').unsigned().notNullable().references('id').inTable('users');
        table.integer('updated_by').unsigned().references('id').inTable('users');
        table.timestamps(true, true);
    });

    return knex.raw(onUpdateTrigger('projects'));
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('projects');
}