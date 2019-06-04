import lokijs from 'lokijs';
import * as fs from 'fs';

import { Comment } from '../comment/comment';
import { Post } from '../post/post';
import { User } from '../user/user';

export class Database {
  private readonly db: Loki;

  constructor() {
    // TODO: move to constructor
    this.db = new lokijs('zoom-care-candidate-project-nodejs.json');

    /**
     * Users
     */
    const users = this.db.addCollection('users');
    const usersData = JSON.parse(fs.readFileSync(__dirname + '/../data/users.json').toString());
    usersData.forEach((userData: User[]) => {
      users.insert(userData);
    });

    /**
     * Comments
     */
    const comments = this.db.addCollection('comments');
    const commentsData = JSON.parse(fs.readFileSync(__dirname + '/../data/comments.json').toString());
    commentsData.forEach((commentData: Comment[]) => {
      comments.insert(commentData);
    });

    /**
     * Posts
     */
    const posts = this.db.addCollection('posts');
    const postsData = JSON.parse(fs.readFileSync(__dirname + '/../data/posts.json').toString());
    postsData.forEach((postData: Post[]) => {
      posts.insert(postData);
    });
  }

  public get(): Readonly<Loki> {
    return this.db;
  }
}
