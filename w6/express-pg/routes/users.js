const express = require('express');
const router = express.Router();
const db = require('../db/index');

// GET /users
router.get('', async function(req, res, next) {
  try {
    const data = await db.query('SELECT * FROM users');
    return res.json(data.rows);
  } catch (err) {
    return next(err);
  }
});

// GET /users/:id
router.get('/:id', async function(req, res, next) {
  try {
    const data = await db.query('SELECT * FROM users WHERE id=$1', [
      req.params.id
    ]);
    return res.json(data.rows[0]);
  } catch (err) {
    return next(err);
  }
});

// POST /users
router.post('', async function(req, res, next) {
  try {
    const data = await db.query(
      `INSERT INTO users (first_name, last_name, email, photo) VALUES ($1, $2, $3, $4) RETURNING *`,
      [req.body.first_name, req.body.last_name, req.body.email, req.body.photo]
    );
    return res.json(data.rows[0]);
  } catch (err) {
    return next(err);
  }
});

// PATCH /users/:id
router.patch('/:id', async function(req, res, next) {
  try {
    const data = await db.query(
      'UPDATE users SET first_name=$1, last_name=$2, email=$3, photo=$4 WHERE id=$5 RETURNING *',
      [
        req.body.first_name,
        req.body.last_name,
        req.body.email,
        req.body.photo,
        req.params.id
      ]
    );
    return res.json(data.rows[0]);
  } catch (err) {
    return next(err);
  }
});

// DELETE /useres/:id
router.delete('/:id', async function(req, res, next) {
  try {
    await db.query('DELETE FROM users WHERE id=$1', [req.params.id]);
    return res.json({ message: 'User deleted' });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
