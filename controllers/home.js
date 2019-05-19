/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
    res.render('index', { title: 'ZOOM+Care Candidate Code Challenge - NodeJS API' });
};