export default {
  client: 'pg', // postgresql
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '123456',
    database : 'postgres'
  },
  pool: { min: 0, max: 7 }
}
