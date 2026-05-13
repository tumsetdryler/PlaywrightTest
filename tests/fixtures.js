const base = require('@playwright/test');

exports.test = base.test.extend({
    globalBeforeEach: [async ({ page }, use) => {
        // Set up network interception to block ads
        await page.route(/(ads|doubleclick|googlesyndication|tracker)/i, route => {
            route.abort();
        });

        // Go to landing page
        await page.goto('https://practice.expandtesting.com/');

        await use();

        // console.log('Running global teardown after each test');
    }, { auto: true }]
});

exports.expect = base.expect;