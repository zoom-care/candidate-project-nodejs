import lokijs from 'lokijs';
import { celebrate, Joi } from 'celebrate';
import { Express, Request, Response } from 'express';
import { AUTH_TOKEN } from '../auth/auth-token';

export class CommentRoutes {
  private commentValidation = celebrate({
    headers: Joi.object().keys({
      authorization: Joi.string().valid(AUTH_TOKEN).required()
    }).unknown(true)
  });

  constructor(
    private app: Express,
    private db: lokijs
  ) {
    this.app.delete('/comment/:commentId', this.commentValidation, (req: Request, res: Response) => {
      const commentId = +req.params.commentId;
      this.db.getCollection('comments').removeWhere(comment => comment.id === commentId);
      res.send({ status: 'success', message: 'comment deleted' });
    });
  }
}
