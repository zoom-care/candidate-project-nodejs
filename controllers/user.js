// Create a user
// TODO: create a service for each controller 
exports.createUser = (req, res, db) => {
    const users = db.getCollection('users');
    let user = users.find({id: parseInt(req.body.id)});

    if (user.length) {
        res.status(404).send({message: 'User already exists!'});
        return
    }

    user = users.insert(req.body);
    if (!user) {
        res.status(404).send({message: 'User not inserted'});
        return;
    }

    res.status(200).send({message: 'success'});
};

exports.retrievePostComments = (req, res, db) => {
    const comments = db.getCollection('comments');
    const postId = parseInt(req.params.postid);
    const userComments = comments.find({postId});
    
    if (!userComments) {
        res.status(404).send({message: 'Item not found'});
        return;
    }
    
    // TODO: we can modify user response here before sending it
    res.status(200).send(userComments);
};

exports.updatePost = (req, res, db) => {
    const postId = parseInt(req.body.id);
    const userId = parseInt(req.body.userId);
    const posts = db.getCollection('posts');
    const post = posts.findObject({id: postId, userId});

    if (!post) {
        res.status(404).send({message: 'Item not found'});
        return;
    }
    
    post.title = req.body.title;
    post.body = req.body.body
    posts.update(post)

    res.status(200).send({message: 'success'});
};

exports.deleteComment = (req, res, db) => {
    const comments = db.getCollection('comments');
    const commentID = parseInt(req.params.commentid);
    comments.findAndRemove({id: commentID})
    res.status(200).send({message: 'success'});
};
