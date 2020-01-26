const express = require('express');
const graphqlHTTP = require('express-graphql');
const rootSchema = require("./src/graphql/schema");
const db = require("./src/database/index");
const app = express();

app.use('/graphql', graphqlHTTP({
  schema: rootSchema,
  context: { db },
  graphiql: true
}));

app.listen(4000);
console.log('GraphQL API server started');
console.log('* Visit localhost:4000/graphql to play with GraphiQL');
console.log('* Press ctrl+c to stop the server');