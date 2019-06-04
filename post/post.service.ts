import Loki from 'lokijs';

import { Post } from './post';

export class PostService {
  private readonly db: Loki;

  constructor(db: Readonly<Loki>) {
    this.db = db;
  }

  public getData(): Post[] {
    return this.db.getCollection<Post>('posts').data;
  }
}
