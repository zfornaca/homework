const express = require('express');
const router = express.Router();
const db = require('../db/index');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const {
  ensureLoggedIn,
  ensureCompanyAcct,
  ensureCorrectCompany
} = require('../middleware/auth.js');

// POST /jobs
router.post('', ensureCompanyAcct, async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jsonwebtoken.verify(token, 'CONTIGO');
    const data = await db.query(
      'INSERT INTO jobs (title, salary, equity, company_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [req.body.title, req.body.salary, req.body.equity, decodedToken.id]
    );
    return res.json(data.rows[0]);
  } catch (err) {
    return next(err);
  }
});

// GET /jobs
router.get('', ensureLoggedIn, async (req, res, next) => {
  try {
    const data = await db.query('SELECT * FROM jobs');
    return res.json(data.rows);
  } catch (err) {
    return next(err);
  }
});

// GET /jobs/:id
router.get('/:id', ensureLoggedIn, async (req, res, next) => {
  try {
    const data = await db.query('SELECT * FROM jobs WHERE id=$1', [
      req.params.id
    ]);
    return res.json(data.rows[0]);
  } catch (err) {
    return next(err);
  }
});

// PATCH /jobs/:id
router.patch('/:id', async (req, res, next) => {
  try {
    const currentCompany = await db.query(
      'SELECT company_id FROM jobs WHERE id=$1',
      [req.params.id]
    );
    const token = req.headers.authorization;
    const decodedToken = jsonwebtoken.verify(token, 'CONTIGO');
    if (currentCompany.rows[0].company_id !== decodedToken.id) {
      return res.json({ message: 'Unauthorized -- wrong company' });
    }
    const data = await db.query(
      'UPDATE jobs SET title=$1, salary=$2, equity=$3, company_id=$4 WHERE id=$5 RETURNING *',
      [
        req.body.title,
        req.body.salary,
        req.body.equity,
        decodedToken.id,
        req.params.id
      ]
    );
    return res.json(data.rows[0]);
  } catch (err) {
    return next(err);
  }
});

// DELETE /jobs/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const currentCompany = await db.query(
      'SELECT company_id FROM jobs WHERE id=$1',
      [req.params.id]
    );
    const token = req.headers.authorization;
    const decodedToken = jsonwebtoken.verify(token, 'CONTIGO');
    if (currentCompany.rows[0].company_id !== decodedToken.id) {
      return res.json({ message: 'Unauthorized -- wrong company' });
    }
    await db.query('DELETE FROM jobs WHERE id=$1', [req.params.id]);
    return res.json({ message: 'Job deleted' });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
