// var GraphQLSchema = require('graphql').GraphQLSchema;
// var GraphQLObjectType = require('graphql').GraphQLObjectType;
// var queryType = require('./queries/user').queryType;
// var mutation = require('./mutations/index');

// exports.userSchema = new GraphQLSchema({
//   query: queryType,
//   mutation: new GraphQLObjectType({
//     name: 'Mutation',
//     fields: mutation
//   })
// })

const importSchema = require('graphql-import').importSchema;
const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
const comments = require('./comments').comments;

const typeDefs = importSchema('./graphql/schema.graphql');

const resolvers = {
  Query: {
    comments
  },
  Mutation: {
    createUser: (root, params) => {
      console.log(params)
      return {
        id: 1,
        ...params
      };
    }
  },
};
 
exports.rootSchema = makeExecutableSchema({ typeDefs, resolvers });
