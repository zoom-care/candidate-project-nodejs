import Loki from 'lokijs';

import { Post } from './post';
import { Comment } from '../comment/comment';

export class PostService {
  constructor(private db: Readonly<Loki>) {
    this.db = db;
  }

  public getData(whereFn: (post: Post) => boolean = _ => true): (Post & { comment: Comment })[] {
    return this.db.getCollection('posts').where(whereFn).map(post => {
      return {
        ...post,
        comments: this.db.getCollection<Comment>('comments').where(comment => comment.postId === post.id)
      };
    });
  }
}
