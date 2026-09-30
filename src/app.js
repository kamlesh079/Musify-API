const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const musicRoutes = require('./routes/music.route');


const app = express();

app.use(express.json());
app.use(cookieParser());

// auth routes
app.use('/api/auth', authRoutes);

// music routes
app.use('/api/music', musicRoutes);


module.exports = app;