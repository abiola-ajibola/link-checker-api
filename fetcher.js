const puppeteer = require('puppeteer-core');

const findImg = async (p) => {
    const [m1] = await p.$x('//link[@rel="icon"]');
    const [m2] = await p.$x('/html/head/meta[@itemprop="image"]');
    if (m1) {
        const hr = await m1.getProperty('href');
        var href = await hr.jsonValue();
    } else if (m2) {
        const hr = await m2.getProperty('content');
        var href = await hr.jsonValue();
    } else {
        var href = 'no image';
    }
    return href;
}

const fetcher = async (url) => {
    const browser = await puppeteer.launch({
        headless: true,
        executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge Dev\\Application\\msedge.exe"
    });
    const page = await browser.newPage();
    await page.goto(url);
    // await page.waitForNavigation({ waitUntil: 'networkidle2' })
    const href = await findImg(page);

    const title = await page.$eval('head>title', el => el.innerHTML);
    // img1 = await img1.jsonValue();
    // img2 = await img2.jsonValue();
    // const img = img1 || img2;
    console.log(title, href);

    await browser.close();
    if (href.includes('http')) {
        return {
            title: title,
            url: href
        }
    }
    return {
        title: title,
        url: `${url}${href}`
    }
}

module.exports = { fetcher };