const logger = require('morgan');
const cookieParser = require('cookie-parser');

import * as BodyParser from 'body-parser';
import * as path from 'path';
import cors from 'cors';
import createError from 'http-errors';
import express, { NextFunction, Request, Response } from 'express';
import { errors } from 'celebrate';

import { AppRoutes } from './app.routes';
import { CommentRoutes } from './comment/comment.routes';
import { Database } from './config/database';
import { PostService } from './post/post.service';
import { UserRoutes } from './user/user.routes';
import { UserService } from './user/user.service';

const db = new Database();
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((cookieParser as any)());
app.use(cors());
app.use(BodyParser.json())
app.use(errors());

const postService = new PostService(db.get());
const userService = new UserService(db.get(), postService);

new AppRoutes(app);
new CommentRoutes(app, db.get());
new UserRoutes(app, userService);

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
