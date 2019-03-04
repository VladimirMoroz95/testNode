import express from 'express';
import knex from '../db/knex';

const router = express.Router();

const Articles = () => {
  return knex('Article');
};


const Users = () => {
  return knex('User');
};

router.get('/', function (req, res, next) {

  Articles()
    .join('User', 'Article.author_id', '=', 'User.id')
    .select('Article.id', 'Article.title', 'Article.tags','User.fio')
    .then((records) => {
      res.send(records);
    });

});

router.post('/', (req, res, next) => {
  const {title, author_id, tags} = req.body;

  if (!title) res.status(400).send('The titile is incorrect');

  Users().where({id: author_id}).select().then((records) => {
    if (records.length === 0) {
      res.status(400).send('Author is not defined')
    } else {
      Articles().insert({title, author_id, tags}).then(() => {
        res.send('Article has been add')
      });
    }
  });

});

router.delete('/:id', (req, res) => {
  const {id} = req.params;

  return Articles().where({id}).del().then(() => {
    res.send('Article has been delete')
  });
});

export default router;
