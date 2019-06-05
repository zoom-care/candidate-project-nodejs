import lokijs from 'lokijs';

import { Comment } from '../comment/comment';
import { Post } from '../post/post';
import { PostService } from '../post/post.service';
import { User } from './user';

export class UserService {
  constructor(
    private db: lokijs,
    private postService: PostService
  ) {}

  public getPostsForUser(userId: number): (Post & { comment: Comment })[] {
    return this.postService.getData(post => post.userId === userId);
  }

  public addUser(user: Partial<User>): User | undefined {
    return this.db.getCollection('users').insert(user);
  }
}
