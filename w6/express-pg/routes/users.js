const express = require('express');
const router = express.Router();
const db = require('../db/index');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { ensureLoggedIn, ensureCorrectUser } = require('../middleware/auth.js');

// POST /users/auth
router.post('/auth', async (req, res, next) => {
  try {
    const userData = await db.query('SELECT * FROM users WHERE username=$1', [
      req.body.username
    ]);
    if (userData.rows.length === 0)
      return res.json({ message: 'Invalid username' });

    const result = await bcrypt.compare(
      req.body.password,
      userData.rows[0].password
    );
    if (!result) return res.json({ message: 'Invalid password' });

    const token = jsonwebtoken.sign(
      {
        username: userData.rows[0].username,
        id: userData.rows[0].id
      },
      'CONTIGO'
    );
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
});

// GET /users
router.get('', ensureLoggedIn, async (req, res, next) => {
  try {
    const data = await db.query('SELECT * FROM users');
    return res.json(data.rows);
  } catch (err) {
    return next(err);
  }
});

// GET /users/:id
router.get('/:id', ensureLoggedIn, async (req, res, next) => {
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
router.post('', async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userData = await db.query(
      `INSERT INTO users (first_name, last_name, email, photo, username, password, company_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        req.body.first_name,
        req.body.last_name,
        req.body.email,
        req.body.photo,
        req.body.username,
        hashedPassword,
        req.body.company_id
      ]
    );
    return res.json(userData.rows[0]);
  } catch (err) {
    return next(err);
  }
});

// PATCH /users/:id
router.patch('/:id', ensureCorrectUser, async (req, res, next) => {
  try {
    const data = await db.query(
      'UPDATE users SET first_name=$1, last_name=$2, email=$3, photo=$4, password=$5 WHERE id=$6 RETURNING *',
      [
        req.body.first_name,
        req.body.last_name,
        req.body.email,
        req.body.photo,
        req.body.password,
        req.params.id
      ]
    );
    return res.json(data.rows[0]);
  } catch (err) {
    return next(err);
  }
});

// DELETE /useres/:id
router.delete('/:id', ensureCorrectUser, async (req, res, next) => {
  try {
    await db.query('DELETE FROM users WHERE id=$1', [req.params.id]);
    return res.json({ message: 'User deleted' });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
