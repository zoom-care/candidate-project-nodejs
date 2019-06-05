import { Comment } from '../comment/comment';
import { Post } from '../post/post';
import { PostService } from '../post/post.service';

export class UserService {
  constructor(private postService: PostService) {}

  public getPostsForUser(userId: number): (Post & { comment: Comment })[] {
    return this.postService.getData(post => post.userId === userId);
  }
}
