import lokijs from 'lokijs';
import { Express, Request, Response } from 'express';

import { isAuthorized } from '../auth/check-auth-header';

export class CommentRoutes {
  constructor(
    private app: Express,
    private db: lokijs
  ) {
    this.app.delete('/comment/:commentId', (req: Request, res: Response) => {
      if (!isAuthorized(req.headers)) {
        return res.status(401).json({ error: 'unauthorized' });
      }

      const commentId = +req.params.commentId;
      this.db.getCollection('comments').removeWhere(comment => comment.id === commentId);
      res.send({ success: 'comment deleted' });
    });
  }
}
