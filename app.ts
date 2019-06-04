const logger = require('morgan');
const cookieParser = require('cookie-parser');

import * as path from 'path';
import createError from 'http-errors';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';

import { Database } from './config/database';
import { isAuthorized } from './auth/check-auth-header';
import { PostService } from './post/post.service';
import { User } from './user/user';
import { validateUser } from './user/user-validation';

const db = new Database();
const app = express();

const postService = new PostService(db.get());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((cookieParser as any)());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.get('/', (_req: Request, res: Response) => {
  res.render('index', { title: 'ZOOM+Care Candidate Code Challenge - NodeJS API - Alex Luecke' });
});

app.get('/user/:userId/posts', (req: Request, res: Response) => {
  const userId = +req.params.userId;
  const userPosts = postService.getData(post => post.userId === userId);
  res.render('posts', { posts: userPosts });
});

app.post('/user', (req: Request, res: Response) => {
  if (!isAuthorized(req.headers)) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  const newUser: Partial<User> = req.params;

  if (!validateUser(newUser)) {
    return res.status(400).json({ error: 'could not create user' });
  }

  res.send({ success: 'user created' });
});

app.delete('/comment/:commentId', (req: Request, res: Response) => {
  if (!isAuthorized(req.headers)) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  const commentId = +req.params.commentId;
  db.get().getCollection('comments').removeWhere(comment => comment.id === commentId);
  res.send({ success: 'comment deleted' });
});

// catch 404 and forward to error handler
app.use((_req: any, _res: any, next: any) => {
  next(createError(404));
});

// error handler
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
