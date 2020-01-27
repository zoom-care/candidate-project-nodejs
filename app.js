const express = require('express');
const graphqlHTTP = require('express-graphql');
const { GraphQLSchema } = require('graphql');
const db = require("./src/database/index");
const app = express();

const { QueryRoot, MutationRoot } = require('./src/graphql/schema');

const schema = new GraphQLSchema({
  query: QueryRoot,
  mutation: MutationRoot,
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  context: { db },
  graphiql: true
}));

app.listen(4000);
console.log('GraphQL API server started');
console.log('* Visit localhost:4000/graphql to play with GraphiQL');
console.log('* Press ctrl+c to stop the server');