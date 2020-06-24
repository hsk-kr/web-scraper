import fs from 'fs';
import { fetchSourceFromurl } from './scraping';

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

export const fetchStockList = async (): Promise<Array<Stock>> => {
    const source: string = await fetchSourceFromurl(generateMarkerListUrl('kospi', 1));
    return [];
};



