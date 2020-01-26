const { GraphQLObjectType } = require('graphql');
const { createUserMutationResolver } = require('./types/user');
const { getPostQueryResolver, updatePostMutationResolver } = require('./types/post');
const { deleteCommentMutationResolver } = require('./types/comment');

const QueryRoot = new GraphQLObjectType({
    name: 'QueryRoot',
    fields: {
        getPost: getPostQueryResolver,
    },
});

const MutationRoot = new GraphQLObjectType({
    name: 'MutationRoot',
    fields: {
        createUser: createUserMutationResolver,
        updatePost: updatePostMutationResolver,
        deleteComment: deleteCommentMutationResolver,
    },
});

module.exports = {
    QueryRoot,
    MutationRoot,
};