module.exports = (req, res, next) => {
    res.append('Access-Control-Allow-Origin', '*');
    res.append('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization');
    next();
};