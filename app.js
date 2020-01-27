const express = require('express');
const graphqlHTTP = require('express-graphql');
const { GraphQLSchema } = require('graphql');
const db = require("./src/database/index");
const app = express();
const cors = require('cors');

const { QueryRoot, MutationRoot } = require('./src/graphql/schema');

const schema = new GraphQLSchema({
  query: QueryRoot,
  mutation: MutationRoot,
});

app.use(cors()); // Allows Cross-Origin Resource Sharing (CORS) from any domain.
app.use('/graphql', graphqlHTTP((request, response, graphQLParams) => ({
  schema: schema,
  context: {
    db,
    request // Needed for checking the Authorization header for mutations.
  },
  graphiql: true
})));

app.listen(4000);
console.log('GraphQL API server started');
console.log('* Visit localhost:4000/graphql to play with GraphiQL');
console.log('* Press ctrl+c to stop the server');