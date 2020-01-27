const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql');

module.exports = CommentType = new GraphQLObjectType({
    name: "CommentType",
    description: "A comment object",
    fields: () => ({
        postId: {
            type: GraphQLInt,
            description: 'The posts id.'
        },
        id: {
            type: GraphQLInt,
            description: 'The comments id.',
        },
        name: {
            type: GraphQLString,
            description: 'Name of user that left comment.',
        },
        email: {
            type: GraphQLString,
            description: 'Email of user that left comment.',
        },
        body: {
            type: GraphQLString,
            description: "Content of the comment.",
        },
    })
});