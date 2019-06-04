import * as loki from 'lokijs';

import { Post } from './post';

export class PostService {
  private collection: loki.Collection;

  constructor(collection: loki.Collection) {
    this.collection = collection;
  }

  public getData(): Post[] {
    return this.collection.data;
  }
}
