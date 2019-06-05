import { Express, Request, Response } from 'express';

import { isAuthorized } from '../auth/check-auth-header';
import { User } from '../user/user';
import { UserService } from './user.service';
import { validateUser } from '../user/user-validation';

export class UserRoutes {
  constructor(
    private app: Express,
    private userService: UserService
  ) {
    this.app.get('/user/:userId/posts', (req: Request, res: Response) => {
      const userPosts = this.userService.getPostsForUser(+req.params.userId);
      res.render('posts', { posts: userPosts });
    });

    this.app.post('/user', (req: Request, res: Response) => {
      if (!isAuthorized(req.headers)) {
        return res.status(401).json({ error: 'unauthorized' });
      }

      const newUser: Partial<User> = req.params;

      if (!validateUser(newUser)) {
        return res.status(400).json({ error: 'could not create user' });
      }

      res.send({ success: 'user created' });
    });
  }
}
