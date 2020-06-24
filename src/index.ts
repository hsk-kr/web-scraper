import { fetchStockList } from './lib/naver-stock-scraping';

const main = async () => {
    await fetchStockList();
};

main();