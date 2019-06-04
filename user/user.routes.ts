import { Express, Request, Response } from 'express';

import { isAuthorized } from '../auth/check-auth-header';
import { PostService } from '../post/post.service';
import { User } from '../user/user';
import { validateUser } from '../user/user-validation';

export class UserRoutes {
  constructor(
    private app: Express,
    private postService: PostService
  ) {
    this.app.get('/user/:userId/posts', (req: Request, res: Response) => {
      const userId = +req.params.userId;
      const userPosts = this.postService.getData(post => post.userId === userId);
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
