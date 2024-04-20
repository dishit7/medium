// drop-table.ts
import { Client } from 'pg'; // Import the PostgreSQL client

const client = new Client({
  connectionString: process.env.DATABASE_URL, // Your database connection string
});

async function dropTable() {
  try {
    await client.connect(); // Connect to the database
    await client.query('DROP TABLE IF EXISTS your_table_name'); // Replace with your table name
    console.log('Table dropped successfully');
  } catch (error) {
    console.error('Error dropping table:', error);
  } finally {
    await client.end(); // Close the database connection
  }
}

dropTable();
