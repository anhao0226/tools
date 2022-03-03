import Axios from "axios";
import { MD5 } from ".";

const BAIDU_APPID = "20220129001070948";
const BAIDU_SALT = "1435660288";
const BAIDU_KEY = "Epd3GCtivL254qlgX0b9";
const BAIDU_FANYI = `https://fanyi-api.baidu.com/api/trans/vip/language`;

const baidu_instance = Axios.create({
    baseURL: BAIDU_FANYI,
    // headers: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    // }
})

interface TrabslateOptions {
    q: string;
    to: string;
    from: string;
    success: (res: any) => void;
    error: (err: Error) => void;
}


function createSign(search: string) {
    return MD5(BAIDU_APPID + search + BAIDU_SALT + BAIDU_KEY);
}

export function fetchTrabslateResult(options: TrabslateOptions) {
    baidu_instance({
        params: {
            q: options.q,
            to: options.to,
            salt: BAIDU_SALT,
            sign: createSign(options.q),
            from: options.from,
            appid: BAIDU_APPID,
        }
    }).then((res) => {
        options.success(res);
    }).catch((err) => {
        options.error(err)
    })
}



