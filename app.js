const express = require('express');
const app = express();
const port = 3000;
const sequelize = require('./config/database')
const authRoutes = require('./routes/authRoutes')
const bookRoutes = require('./routes/bookRoutes')
const memberRoutes = require('./routes/memberRoutes')
const borrowingRoutes = require('./routes/borrowingRoutes')
const path = require('path');
const authMiddleware = require('./middlewares/authMiddleware');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', authRoutes);
app.use(authMiddleware)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/books', bookRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/borrowings', borrowingRoutes);

sequelize.sync()
  .then(() => {
    console.log('Database synced');
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

