import express from 'express';
import knex from '../db/knex';
import TokenGerator from 'uuid-token-generator';

const router = express.Router();

const Sessions = () => {
  return knex('User-Session');
};

const Users = () => {
  return knex('User');
};

const logout = (login) => {
  return Sessions().where({
    user_login: login
  }).del();
};


router.post('/login', (req, res) => {
  const {login, password} = req.body;


  Users().where({login}).select().then((records) => {
    const token = new TokenGerator().generate();

    if (records.length === 0 || records[0].password !== password) {
      res.status(400).send('The login or password is incorrect')
    } else {
      knex('User-Session').insert({token, user_login: login}).then(() => {
        res.send(JSON.stringify({token}))
      });
    }

  });
});

router.post('/logout', (req, res) => {
  const {login} = req.body;

  logout(login).then(() => {
    res.send('User has been logout')
  });
});

export default router;
