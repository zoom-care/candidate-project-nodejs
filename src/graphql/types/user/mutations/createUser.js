const { GraphQLNonNull, GraphQLString, GraphQLList } = require('graphql');
const { GraphQLJSONObject } = require('graphql-type-json');
const UserType = require('../userType');

const createUserMutationResolver = {
  type: UserType,
  args: {
    name: {
      type: GraphQLNonNull(GraphQLString),
    },
    username: {
      type: GraphQLNonNull(GraphQLString),
    },
    email: {
      type: GraphQLNonNull(GraphQLString),
    },
    address: {
      type: GraphQLJSONObject,
    },
    phoneNumbers: {
      type: GraphQLList(GraphQLString),
    },
    website: {
      type: GraphQLString,
    },
  },
  resolve: async (_, args, { db, request }) => {
    if (!request.headers.authorization) {
      throw new Error('Unauthorized.');
    }

    try {
      const user = {
        // Incrementing the new user ID based upon the max ID
        // that currently exists in the data store.
        id: db.users.maxId + 1,
        ...args,
      };

      db.users.insert(user);
      return user;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
};

module.exports = createUserMutationResolver;
