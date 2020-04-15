import Knex from 'knex'

const environment = process.env.ENVIRONMENT || 'development'
const config = require('../../knexfile.js')[environment]

export const db = Knex(config)
