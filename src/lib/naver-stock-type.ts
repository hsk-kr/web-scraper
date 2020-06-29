export interface URLS {
    [key: string]: string;
}

export interface Stock {
    name: string;
    detailPageUrl: string;
    stockType: string;
}

export type StockType = "kospi" | "kosdaq";

export interface TradingHistory {
    institution: number;
    foreigner: number;
    isRise: boolean;
    date: object;
}