const validation = require('../validation/validation');
/*
* Initialize database
*/

require('../config/loki').init();
const db = require('../config/loki').getDatabase();


module.exports = {
    commentsGetByPost(req, res, next) {
        try {
            const data = db.getCollection('comments').where((obj) => { return obj.postId == req.params.id; });
            if (data.length == 0) {
                const error = new Error('Not found.')
                error.httpStatusCode = 404;
                return next(res, undefined, error);
            }
            return next(res, data);
        }
        catch(error) {
            return next(res, undefined, error);
        }
    },
    usersInsert(req, res, next) {
        // first find the new id.
        newId = db.getCollection('users').find()
            .sort((a,b) => {
                if (a.id > b.id) {
                    return -1;
                } 
                if (a.id < b.id) {
                    return 1;
                }
                return 0;
                }).slice(0,1)[0].id + 1;
        var newUser = req.body;
        newUser.id = newId;
        err = validation.validate(newUser, validation.constraints.users);
        if (err) {
            const error = new Error(err);
            error.httpStatusCode = 400;
            return next(res, undefined, error);
        } 
        try {
            db.getCollection('users').insert(newUser);
        }
        catch(err) {
            err.httpStatusCode = 400;
            return next(res, undefined, error);
        }
        return next(res, `User ${newId} inserted.`);
    },
    postPatch(req, res, next) {
        const id = req.params.id;
        const data = db.getCollection('posts').where((obj) => { return obj.id == id; });
        if (data.length == 0) {
            const error = new Error('Not found.')
            error.httpStatusCode = 404;
            return next(res, undefined, error);
        }
        for (const member of Object.keys(req.body)) {
            data[0][member] =req.body[member];
        }
        try{
            err = validation.validate(req.body, validation.constraints.posts);
            db.getCollection('posts').update(data);
        }
        catch(err) {
            err.httpStatusCode = 400;
            return next(res, undefined, error);
        }
        return next(res, `Post ${req.params.id} updated.`);
    },
    commentsDelete(req, res, next) {
        const id = req.params.id;
        const data = db.getCollection('comments').where((obj) => { return obj.id == id; });
        if (data.length == 0) {
            const error = new Error('Not found.')
            error.httpStatusCode = 404;
            return next(res, undefined, error);
        }
        try {
            db.getCollection('comments').remove(data);
        }
        catch(err) {
            err.httpStatusCode = 400;
            return next(res, undefined, error);
        }
        return next(res, `Comment ${id} deleted.`);
    }
}
