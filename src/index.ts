import {
  fetchStockList,
  fetchTradingHistory,
} from "./lib/naver-stock/naver-stock-scraping";
import { analyzeStock } from "./lib/naver-stock/naver-stock-anaylzer";

const main = async () => {
  const list: any = await fetchStockList("kospi");

  for (let i = 0; i < 30; i++) {
    const tradingHistory: any = await fetchTradingHistory(list[i], 2);  
    list[i].tradingHistory = tradingHistory;
    const analyzedStock = analyzeStock(list[i]);
    console.log(analyzedStock);
  }
};

main();
