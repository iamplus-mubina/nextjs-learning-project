const { Pool } = require('pg');
const data = require('../lib/placeholder-data');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function seed() {
  const client = await pool.connect();
  try {
    console.log('Starting seed...');
    
    // Simple test query
    const result = await client.query('SELECT NOW()');
    console.log('Database connected:', result.rows[0]);
    
    return 'Seed completed successfully!';
  } catch (error) {
    console.error('Error:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Run seed
seed().then(console.log).catch(console.error);