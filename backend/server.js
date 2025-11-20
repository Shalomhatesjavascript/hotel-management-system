require('dotenv').config();
const express = require('express');
const app = express();
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const complaintRoutes = require('./routes/complaints');
const path = require('path');

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../hotel-compliant-management-system/dist')));
  app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '../hotel-compliant-management-system/dist/index.html'))
  );
}

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});