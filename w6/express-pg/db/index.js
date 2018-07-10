const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://localhost/jobbotron'
});

client.connect();

module.exports = client;
