import { fetchStockList } from './lib/naver-stock-scraping';

const main = async () => {
    const list: any = await fetchStockList("kospi");
    console.log(list);
};

main();