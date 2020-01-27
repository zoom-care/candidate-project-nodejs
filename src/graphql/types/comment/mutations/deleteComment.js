const { GraphQLNonNull, GraphQLID } = require('graphql');
const commentType = require('../commentType');

const deleteCommentMutationResolver = {
  type: commentType,
  args: {
    id: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (_, { id }, { db, request }) => {
    if (!request.headers.authorization) {
      throw new Error('Unauthorized.');
    }

    try {
      // Tried to chain find/remove, but it didn't work for some reason.
      // Had to fall back to a more verbose way of doing the removal.
      const comment = db.comments.by('id', id);
      db.comments.remove(comment);

      return {
        id: id,
      };
    } catch (err) {
      console.log(err);
      return err;
    }
  },
};

module.exports = deleteCommentMutationResolver;
