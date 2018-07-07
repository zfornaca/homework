const express = require('express');
const router = express.Router();
const db = require('../db/index');

// POST /jobs
router.post('', async function(req, res, next) {
  try {
    const data = await db.query(
      'INSERT INTO jobs (title, salary, equity, company_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [req.body.title, req.body.salary, req.body.equity, req.body.company_id]
    );
    return res.json(data.rows[0]);
  } catch (err) {
    return next(err);
  }
});

// GET /jobs
router.get('', async function(req, res, next) {
  try {
    const data = await db.query('SELECT * FROM jobs');
    return res.json(data.rows);
  } catch (err) {
    return next(err);
  }
});

// GET /jobs/:id
router.get('/:id', async function(req, res, next) {
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
router.patch('/:id', async function(req, res, next) {
  try {
    const data = await db.query(
      'UPDATE jobs SET title=$1, salary=$2, equity=$3, company_id=$4 WHERE id=$5 RETURNING *',
      [
        req.body.title,
        req.body.salary,
        req.body.equity,
        req.body.company_id,
        req.params.id
      ]
    );
    return res.json(data.rows[0]);
  } catch (err) {
    return next(err);
  }
});

// DELETE /jobs/:id
router.delete('/:id', async function(req, res, next) {
  try {
    await db.query('DELETE FROM jobs WHERE id=$1', [req.params.id]);
    return res.json({ message: 'Job deleted' });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
