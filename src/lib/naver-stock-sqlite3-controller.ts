import { URLS, Stock, StockType, TradingHistory } from './naver-stock-type';
const sqlite3: any = require('sqlite3').verbose();

const DB_FILE_PATH: string = './naver_stocks.db';
const TBL_ANALYZED_DATA = 'naver_analyzed_data';

const initializeTables = async (): void => {
    return new Promise((resolve, reject) => {
        const db = new sqlite3().Database(DB_FILE_PATH, (err) => {
            reject(err);
        });

        db.serialize(() => {
            db.run(`
                CREATE TABLE ${TBL_ANALYZED_DATA}(
                    adid INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    detail_page_url TEXT NOT NULL,
                    stock_type TEXT NOT NULL,
                    weight_value INTEGER NOT NULL,
                    created_at TEXT DEFAULT (DATETIME('now', 'localtime'))
                )
            `);

            db.run(`
                CREATE TABLE ${TBL_STOCKS}(
                    sid INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    detail_page_url TEXT NOT NULL,
                    stock_type TEXT NOT NULL,
                    created_at TEXT DEFAULT (DATETIME('now', 'localtime'))
                )
            `);

            db.run(`
                CREATE TABLE ${TBL_TRADING_TREND}(
                    ttid INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                    institution INTEGER NOT NULL,
                    foreigner INTEGER NOT NULL,
                    rise INTEGER NOT NULL,
                    foreign
                )
            `);
        });
    });
};