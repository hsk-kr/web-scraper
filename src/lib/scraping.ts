import axios from 'axios';
import iconv from 'iconv-lite';

/**
 * Returns html source if there is an error, returns ''
 * @param url 
 */
export const fetchSourceFromurl = async (url: string): Promise<string> => {
    try {
        const res: any = await axios.get(url, { responseType: 'arraybuffer' });

        if (res.status === 200) {
            const ctype: string = res.headers['content-type'];

            if (ctype.toLocaleLowerCase().includes('euc-kr')) {
                return iconv.decode(res.data, 'euc-kr');
            }

            return iconv.decode(res.data, 'utf-8');
        } else {
            throw new Error(`Response status code: ${res.status}`);
        }
    } catch (e) {
        console.error(e);
        return '';

    }
};