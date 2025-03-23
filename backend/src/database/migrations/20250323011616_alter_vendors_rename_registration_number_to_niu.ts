import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('vendors', (table) => {
        table.renameColumn('registration_number', 'niu')
    })

    // Ajouter le commentaire de la table APRÈS la modification de la table
    await knex.raw(`COMMENT ON TABLE vendors IS 'Numéro d''identifiant unique'`)
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('vendors', (table) => {
        table.renameColumn('niu', 'registration_number')
    })

    // Supprimer le commentaire de la table (ou le remettre à sa valeur précédente si nécessaire)
    await knex.raw(`COMMENT ON TABLE vendors IS NULL`)
}
