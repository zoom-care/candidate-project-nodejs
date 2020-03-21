/**
 * API Health Check Endpoint
 */
function healthRoute(api) {
    api.get('/health', (req, res) => {
        res.status(200).send('ok');
    })
}

module.exports = healthRoute;
