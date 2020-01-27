const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } = require('graphql');
const { GraphQLJSONObject } = require('graphql-type-json');
const PostType = require("../post/postType");

module.exports = UserType = new GraphQLObjectType({
    name: "UserType",
    description: "A user object",
    fields: () => ({
        id: {
            type: GraphQLInt,
            description: 'The users id.'
        },
        name: {
            type: GraphQLString,
            description: 'The users full name.',
        },
        username: {
            type: GraphQLString,
            description: 'The users username.',
        },
        email: {
            type: GraphQLString,
            description: 'The users email.',
        },
        address: {
            type: GraphQLJSONObject,
            description: 'The users address object.',
        },
        phoneNumbers: {
            type: GraphQLList(GraphQLString),
            description: 'The users phone numbers.',
        },
        website: {
            type: GraphQLString,
            description: 'The users website.',
        },
        posts: {
            type: GraphQLList(PostType),
            description: "A list of the users posts.",
            resolve: (user, _, context) => context.db.posts.by("userId", user.id)
        },
    })
});