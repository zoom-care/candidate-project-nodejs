const importSchema = require('graphql-import').importSchema;
const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
// users
const createUser = require('./users').createUser;
// comments
const comments = require('./comments').comments;
const deleteComment = require('./comments').deleteComment;
// posts
const posts = require('./posts').posts;
const updatePost = require('./posts').updatePost;

const typeDefs = importSchema('./graphql/schema.graphql');

const resolvers = {
  Query: {
    comments,
    posts,
  },
  Mutation: {
    createUser,
    updatePost,
    deleteComment
  },
};
 
exports.rootSchema = makeExecutableSchema({ typeDefs, resolvers });
