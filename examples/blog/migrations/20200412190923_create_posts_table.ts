import Knex from 'knex'

export const up = async (knex: Knex) => {
  knex.schema.createTable('posts', (table) => {
    table.string('id').primary()
    table.string('title').notNullable()
    table.string('content').notNullable()
  })
}

exports.down = function (knex: Knex) {
  throw new Error('Downward migrations are not supported.')
}
