const express = require('express');
const app = express();
const port = 3000;
const sequelize = require('./config/database')
const authRoutes = require('./routes/authRoutes')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', authRoutes)

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

