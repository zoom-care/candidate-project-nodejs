const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } = require('graphql');
const CommentType = require("../comment/commentType");

module.exports = PostType = new GraphQLObjectType({
    name: "Post",
    description: "A post object",
    fields: () => ({
        userId: {
            type: GraphQLInt,
            description: 'The users id who authored the post.'
        },
        id: {
            type: GraphQLInt,
            description: 'The users full name.',
        },
        title: {
            type: GraphQLString,
            description: 'The post title.',
        },
        body: {
            type: GraphQLString,
            description: 'The post body.',
        },
        comments: {
            type: GraphQLList(CommentType),
            description: "A list of the post comments.",
            resolve: (post, _, {db}) => db.comments.find({"postId": post.id})
        },
    })
});