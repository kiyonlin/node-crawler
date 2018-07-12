const puppeteer = require("puppeteer");
var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "debug";

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage({
        slowMo: 100
    });

    logger.info("开始签到");

    await page.goto("http://www.thworld.net/auth/login");

    await page.type("#email", "email");
    await page.type("#passwd", "passwd");

    logger.info("登录...");
    await page.click("#login");

    // 等待页面登录到首页，可以看到'签到获取流量'
    await page.waitFor(6000);

    logger.info("等待验证条加载...");

    try {
        // let iframe;

        // for (let child of page.mainFrame().childFrames()) {
        //     if (child.url().includes("https://authedmine.com")) {
        //         iframe = child;
        //         break;
        //     }
        // }
        // const verifyMe = await iframe.$("#verify-me");
        // console.log(await verifyMe.click());
        // dumpFrameTree(page.mainFrame(), "");
        // await browser.close();

        // function dumpFrameTree(frame, indent) {
        //     console.log(indent + frame.url());
        //     for (let child of frame.childFrames()) dumpFrameTree(child, indent + "  ");
        // }
        const iframe = page.frames().find(f => {
            return f.url().includes("https://authedmine.com");
        });

        console.log("iframe", iframe);
        // const verifyMe = await iframe.$("#verify-me");
        //         console.log(await verifyMe.text());
        // if (!iframe) {
        //     logger.info("已经签到");
        //     await browser.close();
        // }

        // logger.info("点击验证条，等待20秒...");

        // await iframe.click("#verify-me");

        // await page.waitFor(20000);

        // logger.info("开始签到...");
        // await page.click("#checkin");
        // logger.info("签到成功");
    } catch (e) {
        logger.error("签到失败:", e);
    }

    await browser.close();
})();
