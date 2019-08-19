const importSchema = require('graphql-import').importSchema;
const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
//Auth
const authWrapper = require("./auth").authWrapper;

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
    createUser: authWrapper(createUser),
    updatePost: authWrapper(updatePost),
    deleteComment: authWrapper(deleteComment)
  },
};
 
exports.rootSchema = makeExecutableSchema({ typeDefs, resolvers });
