import express from 'express';
import knex from '../db/knex';
import TokenGerator from 'uuid-token-generator';
const router = express.Router();

const Users = () => {
  return knex('User');
};

router.get('/', function(req, res, next) {

  Users().select().then(function (records) {
    Users().select().then(function (records) {
      res.render('users', records);
    });
  });
});

export default router;
