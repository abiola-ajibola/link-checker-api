const puppeteer = require('puppeteer-core');

const findImg = async (p) => {
    try {
    const [m1] = await p.$x('//link[@rel="shortcut icon"]');
    const m2 = await p.$x('/html/head/meta[@content]');

    if (m1) {
        const hr = await m1.getProperty('href');
        var href = await hr.jsonValue();
    } else if (m2) {
        const metaTags = await p.$$eval('head > [content]', x => x.map(tagz => tagz.getAttribute('content')));
        console.log('metas: ', metaTags);
        const ref = metaTags.filter(x => x.endsWith('.jpg') || x.endsWith('.jpeg') || x.endsWith('.ico') || x.endsWith('.png') || x.endsWith('.gif'))
        href = ref[0];
    } else {
        var href = 'no image';
    }
    console.log('href :', href);
    return href;
    } catch(err) {
        console.log(err);
        return 'Server error!'
    }
}

const fetcher = async (url) => {
    try {
    const browser = await puppeteer.launch({
        // The executable path is for running puppeteer locally with edge dev browser
        // executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge Dev\\Application\\msedge.exe",
        args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(url);
    const href = await findImg(page);

    const title = await page.$eval('head>title', el => el.innerHTML);
    const pageHost = await page.evaluate(() => document.location.href);
    console.log(pageHost);

    await browser.close();
    if (href.includes('http')) {
        return {
            title: title,
            url: href
        }
    }
    if (href === 'Server error!' ) {
        return {
            title: href,
            url: href
        }
    }
    return {
        title: title,
        url: `${pageHost}${href}`
    }
    } catch (err) {
        console.log(err);
    }
}

module.exports = { fetcher };
