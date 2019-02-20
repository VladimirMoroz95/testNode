import express from 'express';
import knex from '../db/knex'
  ;
const router = express.Router();

function Users() {
  return knex('User');
}

/* GET users listing. */
router.get('/', function(req, res, next) {

  Users().select().then(function (records) {
    res.send( records );
  });
});

export default router;
