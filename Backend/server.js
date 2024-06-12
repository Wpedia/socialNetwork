import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import path from 'path'

import connectToMongoDB from './db/connectToMongoDB.js';
import { app, server } from './socket/socket.js';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import profileRoutes from './routes/profile.routes.js';
import postRoutes from './routes/post.routes.js';
import cors from './middleware/cors.middleware.js';

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve()

dotenv.config();

app.use(fileUpload({}));
app.use(cors);
app.use(express.static('static'));
app.use(express.json());
app.use(cookieParser());

app.use('/api/avatar', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/post', postRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")))

app.get("*", (res,req) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`server running on port ${PORT}`);
});