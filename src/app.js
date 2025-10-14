const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/auth.routes');
const stories = require('./routes/stories');
const meRoutes = require('./routes/me.routes')
const getRoutes = require('./routes/get.routes');
const chapter = require('./routes/chapter.routes');
const storyComment = require('./routes/storycomment.routes');
const authorRoutes = require('./routes/author.routes');
const adminRoutes = require("./routes/admin.routes");
const forum = require('./routes/forum.routes');
const mailRoutes = require("./routes/mail.routes");
const userRoutes = require("./routes/user.routes");


const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => res.send('API OK'));

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/mail", mailRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profile', getRoutes);
app.use('/api/stories', stories);
app.use('/api/chapter', chapter);
app.use("/api/author", authorRoutes);
app.use('/api/story-comment', storyComment);
app.use('/api/forum', forum);
app.use('/api', meRoutes);

// 404
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

module.exports = app;
