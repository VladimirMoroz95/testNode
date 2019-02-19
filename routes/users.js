import express from 'express';
import knex from '../db/knex'
  ;
const router = express.Router();

function Users() {
  return knex('users');
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

export default router;
