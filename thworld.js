const puppeteer = require('puppeteer');
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('http://www.thworld.net/auth/login');

    await page.type('#email', 'email');
    await page.type('#passwd', 'passwd');

    await page.click('#login');

    // 等待页面登录到首页，可以看到'签到获取流量'
    await page.waitFor(6000);

    try {
        // await page.reload();
        let content = await page.content();
        // console.log(content);

        const reg = /<iframe src="(.*whitelabel=1)"/g;
        let result = reg.exec(content);
        // console.log('iframe地址:', result[1]);

        const iframePage = await browser.newPage();

        await iframePage.goto(result[1]);
        // let iframeContent = await iframePage.content();

        logger.info('点击验证码...');
        await iframePage.click('#verify-me');

        logger.info('等待60秒...');
        await page.waitFor(60000);

        // await page.reload();

        logger.info('开始签到...');
        await page.click('#checkin');
        logger.info('签到成功');
    } catch (e) {
        logger.error('签到失败:', e);
    }

    await browser.close();
})();
