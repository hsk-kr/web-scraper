import {
  fetchStockList,
  fetchTradingHistory,
} from "./lib/naver-stock-scraping";

const main = async () => {
  const list: any = await fetchStockList("kospi");
  const s: any = await fetchTradingHistory(list, 2);
  console.log(s);
};

main();
