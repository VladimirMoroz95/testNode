import express from 'express';
import knex from '../db/knex';

const router = express.Router();

const Users = () => {
  return knex('User');
};

router.get('/', function (req, res, next) {

  Users().select().then((records) => {
    res.render('users', records);
  });

});

router.put('/', (req, res, next) => {
  const {login, password, fio} = req.body;

  if (!login || !password) res.status(400).send('The login or password is incorrect');

  Users().where({login}).select().then((records) => {
    if (records.length > 0) {
      res.status(400).send('User already exists with this login')
    } else {
      Users().insert({login, password, fio}).then(() => {
        res.send('User has been add')
      });
    }
  });

  next()
});

router.delete('/:id', (req, res) => {
  const {id} = req.params;

  return Users().where({id}).del().then(() => {
    res.send('User has been delete')
  });
});

export default router;
