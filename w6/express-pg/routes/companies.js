const express = require('express');
const router = express.Router();
const db = require('../db/index');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { ensureLoggedIn, ensureCorrectUser } = require('../middleware/auth.js');

// GET /companies
router.get('', ensureLoggedIn, async (req, res, next) => {
  try {
    const data = await db.query('SELECT * FROM companies');
    return res.json(data.rows);
  } catch (err) {
    return next(err);
  }
});

// GET /companies/:id
router.get('/:id', ensureLoggedIn, async (req, res, next) => {
  try {
    const companyData = await db.query('SELECT * FROM companies WHERE id=$1', [
      req.params.id
    ]);
    const userData = await db.query(
      'SELECT users.id FROM users WHERE users.company_id=$1',
      [req.params.id]
    );
    const userList = userData.rows.map(x => x.id);
    companyData.rows[0].users = userList;
    return res.json(companyData.rows[0]);
  } catch (err) {
    return next(err);
  }
});

// POST /companies
router.post('', async function(req, res, next) {
  try {
    const data = await db.query(
      `INSERT INTO companies (name, logo) VALUES ($1, $2) RETURNING *`,
      [req.body.name, req.body.logo]
    );
    return res.json(data.rows[0]);
  } catch (err) {
    return next(err);
  }
});

// PATCH /companies/:id
router.patch('/:id', async function(req, res, next) {
  try {
    const data = await db.query(
      'UPDATE companies SET name=$1, logo=$2 WHERE id=$3 RETURNING *',
      [req.body.name, req.body.logo, req.params.id]
    );
    return res.json(data.rows[0]);
  } catch (err) {
    return next(err);
  }
});

// DELETE /companies/:id
router.delete('/:id', async function(req, res, next) {
  try {
    const data = await db.query(
      'DELETE FROM companies WHERE id=$1 RETURNING *',
      [req.params.id]
    );
    return res.json(data.rows[0]);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

// need to test delete cascade, but delete otherwise works
