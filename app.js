const express = require("express");
const graphqlHTTP = require("express-graphql");
const { GraphQLSchema } = require("graphql");
const db = require('./src/database/index');
const app = express();
const cors = require("cors");

const { QueryRoot, MutationRoot } = require("./src/graphql/schema");

const schema = new GraphQLSchema({
  query: QueryRoot,
  mutation: MutationRoot
});

app.use(cors()); // Allows Cross-Origin Resource Sharing (CORS) from any domain.
app.use(
  "/graphql",
  graphqlHTTP(request => ({
    schema,
    context: {
      db,
      request // Needed for checking the Authorization header for mutations.
    },
    graphiql: true
  }))
);

app.listen(4000);
