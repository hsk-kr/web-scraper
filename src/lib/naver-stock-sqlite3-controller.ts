import { AnalyzedDataType } from './naver-stock-type';
const sqlite3: any = require('sqlite3').verbose();

const DB_FILE_PATH: string = './naver_stocks.db';
const TBL_ANALYZED_DATA = 'naver_analyzed_data';

const openDB = () => {
    return new Promise((resolve, reject) => {
        const db: any = new sqlite3().Database(DB_FILE_PATH, (err) => {
            reject(err);
        });
        resolve(db);
    });
};

export const insertAnalyzedData = async (data: AnalyzedDataType): void => {
    return new Promise((resolve, reject) => {
        let db: any = null;
        try {
            db = await openDB();
        } catch (e) {
            reject(e);
        }

        db.serialize(() => {
            db.run(`
                INSERT INTO ${TBL_ANALYZED_DATA}(
                    name,
                    detail_page_url,
                    stock_type,
                    weight_value,
                    continuous_days
                ) VALUES (
                    ?,
                    ?,
                    ?,
                    ?,
                    ?
                )
            `, [
                data.name,
                data.detailPageUrl,
                data.stockType,
                data.weightValue,
                data.continuousDays
            ], (err) => {
                if (err) {
                    reject(err);
                }
            });
        });

        db.close();
    });
};

/**
 * Create stock analyzed data table if not exists
 */
export const initializeTables = async (): void => {
    return new Promise((resolve, reject) => {
        let db = null;
        try {
            db = await openDB();
        } catch (e) {
            reject(e);
        }

        db.serialize(() => {
            db.run(`
                CREATE TABLE IF NOT EXISTS ${TBL_ANALYZED_DATA}(
                    adid INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    detail_page_url TEXT NOT NULL,
                    stock_type TEXT NOT NULL,
                    weight_value INTEGER NOT NULL,
                    continuous_days INTEGER NOT NULL,
                    created_at TEXT DEFAULT (DATETIME('now', 'localtime'))
                )
            `);
        });

        db.close();
    });
};