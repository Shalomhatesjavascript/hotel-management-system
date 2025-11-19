const express = require('express');
const app = express();
const sequelize = require('./models').sequelize;
const authRoutes = require('./routes/auth');
const complaintRoutes = require('./routes/complaints');

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);

// ✅ 'alter: true' updates the existing tables without deleting data
sequelize.sync({ }).then(() => {
  app.listen(5000, () => console.log('Server running on port 5000'));
});
