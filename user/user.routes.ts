import { celebrate, Joi } from 'celebrate';
import { Express, Request, Response } from 'express';

import { AUTH_TOKEN } from '../auth/auth-token';
import { User } from '../user/user';
import { UserService } from './user.service';

export class UserRoutes {
  private userSchemeValidation = celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required(),
      username: Joi.string().required()
    }).unknown(true),
    headers: Joi.object().keys({
      authorization: Joi.string().valid(AUTH_TOKEN).required()
    }).unknown(true)
  });

  constructor(
    private app: Express,
    private userService: UserService
  ) {
    this.app.get('/user/:userId/posts', (req: Request, res: Response) => {
      const userPosts = this.userService.getPostsForUser(+req.params.userId);
      res.render('posts', { posts: userPosts });
    });

    this.app.post('/user', this.userSchemeValidation, (req: Request, res: Response) => {
      const newUser: Partial<User> = req.body;

      if (!this.userService.addUser(newUser)) {
        return res.status(500).json({ status: 'error', message: 'user save failed' });
      }

      res.send({ success: 'user created' });
    });
  }
}
