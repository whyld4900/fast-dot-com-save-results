import puppeteer from 'puppeteer';
import { BehaviorSubject } from "rxjs";
import { ISpeedResult } from './models';

export async function runFastDotCom(sub: BehaviorSubject<ISpeedResult>) {

    const oneThirdSecond = 333;

    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto('https://fast.com');

    const myInterval = setInterval(async () => {

        const result = await page.evaluate(() => {
            const spdValEle = document.getElementById('speed-value') || document.createElement('div');
            const spdUnitslEle = document.getElementById('speed-units') || document.createElement('div');
            const isDone = spdValEle.classList.contains('succeeded');

            return {
                isDone,
                domain: 'rbb',
                date: new Date().toISOString(),
                speed: Number(spdValEle.textContent),
                rate: spdUnitslEle.textContent
            };
        });

        sub.next(result);

        if (result.isDone) {            
            clearInterval(myInterval);
            await browser.close();
        }

    }, oneThirdSecond);

}
