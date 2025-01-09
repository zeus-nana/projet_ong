import type { Knex } from 'knex';
import { onUpdateTrigger } from '../../../knexfile';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('funders', (table) => {
        table.increments('id').primary();
        table.string('name', 255).notNullable().unique();
        table.string('acronym', 50);
        table.string('category', 50).notNullable(); // public, private, international
        table.string('country_iso_2', 2);
        table.string('address', 255);
        table.string('contact_name', 255);
        table.string('contact_email', 255);
        table.string('contact_phone', 50);
        table.text('description');
        table.integer('created_by').unsigned().notNullable().references('id').inTable('users');
        table.integer('updated_by').unsigned().references('id').inTable('users');
        table.timestamps(true, true);
    });

    return knex.raw(onUpdateTrigger('funders'));
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('funders');
}