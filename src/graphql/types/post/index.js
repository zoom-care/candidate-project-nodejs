const postType = require('./postType');
const getPostQueryResolver = require('./queries/getPost.js');
const updatePostMutationResolver = require('./mutations/updatePost');

module.exports = {
    postType,
    getPostQueryResolver,
    updatePostMutationResolver,
};