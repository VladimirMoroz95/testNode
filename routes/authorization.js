import express from 'express';
import knex from '../db/knex';
import TokenGerator from 'uuid-token-generator';
const router = express.Router();

function Sessions() {
  return knex('User-Session');
}

router.post('/login', function(req, res, next) {
  const { login, password } = req.body;

  Sessions().select().then(function (records) {
    const token = new TokenGerator().generate();

    res.send( 'your token ' + token );
  });
});

router.post( '/logout', function( req, res, next ) {
  const { login } = req.body;

  Sessions().where( {
    user_login: login
  }).select().then( (records) => {
    records.clearSelect();
  });


  next()
});

export default router;
