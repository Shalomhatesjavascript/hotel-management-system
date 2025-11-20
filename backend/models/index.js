const { Sequelize } = require('sequelize');

// Railway gives you DATABASE_URL in environment variables
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: { rejectUnauthorized: false }  // Required by Railway
  },
  logging: false
});

module.exports = { sequelize };