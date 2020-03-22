const fs = require('fs');
const db = require('../config/loki');

describe('Project Test Suite', function () {
    const start = new Date();
    db.init();

    after(async () => {
        const length = new Date() - start;
        const minutes = Math.floor(length / 60000);
        const seconds = ((length % 60000) / 1000).toFixed(0);
        console.info(`Tests completed in ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
    });

    const apiList = fs.readdirSync('./tests/api').filter(file => file.match(/_test.js$/));
    apiList.forEach(file => require(`./api/${file}`)); // eslint-disable-line global-require
});
