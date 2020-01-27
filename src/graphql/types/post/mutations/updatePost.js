const { GraphQLID, GraphQLString } = require('graphql');
const postType = require('../postType');

const updatePostMutationResolver = {
  type: postType,
  args: {
    id: {
      type: GraphQLID,
    },
    userId: {
      type: GraphQLID,
    },
    title: {
      type: GraphQLString,
    },
    body: {
      type: GraphQLString,
    },
  },
  resolve: async (_, { id, userId, title, body }, { db, request }) => {
    if (!request.headers.authorization) {
      throw new Error('Unauthorized.');
    }

    try {
      const post = db.posts.by('id', id);

      if (userId) post.userId = userId;
      if (title) post.title = title;
      if (body) post.body = body;

      db.posts.update(post);

      return post;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
};

module.exports = updatePostMutationResolver;
