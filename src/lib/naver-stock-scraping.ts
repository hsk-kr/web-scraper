import fs from 'fs';
import { fetchSourceFromurl } from './scraping';
import cheerio from 'cheerio';

// fs.writeFileSync('test.html', source);

interface URLS { [key: string]: string };

interface Stock {
    name: string,
    detailPageUrl: string
}

const stockUrls: URLS = {
    MARKER_LIST: 'https://finance.naver.com/sise/sise_market_sum.nhn?sosok={type}&page={page}'
};

type StockType = 'kospi' | 'kosdaq';

const generateMarkerListUrl = (type: StockType, page: number): string => {
    return stockUrls.MARKER_LIST.replace("{type}", type === 'kospi' ? '0' : '1').replace("{page}", page.toString());
};

export const fetchStockList = async (type: StockType): Promise<Array<Stock>> => {
    const stockList: Stock[] = [];

    for (let page = 1; ; page += 1) {
        const source: string = await fetchSourceFromurl(generateMarkerListUrl(type, page));
        const $: any = cheerio.load(source);
        const trs = $('table.type_2 > tbody > tr');

        if (trs.length <= 1) {
            break;
        }

        trs.each((i: number, elem: any) => {
            const tds: any = $(elem).find('td');
            const length: number = tds.length;

            if (length !== 13) {
                console.error(`length: ${length}`);
                return;
            }

            const aElem: any = tds.eq(1).find('a');
            if (aElem === undefined) {
                return;
            }

            const newStock: Stock = {
                name: aElem.text(),
                detailPageUrl: aElem.attr('href')
            }
            stockList.push(newStock);
        });
    }

    return stockList;
};



