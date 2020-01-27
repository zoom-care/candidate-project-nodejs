const { GraphQLID } = require('graphql');
const postType = require('../postType');

const getPostQueryResolver = {
    type: postType,
    args: {
        id: {
            type: GraphQLID,
        },
    },
    resolve: (_, {id}, {db}) => db.posts.by("id", id)
};

module.exports = getPostQueryResolver;