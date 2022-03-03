import Axios from "axios";
import { MD5 } from ".";

const BASE_URL = `http://123.57.239.39/api/user`;

const httpInstance = Axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
})


const formatData = (data: any): string => {
    const postData = [];
    if (data) {
        for (const key in data) {
            postData.push(`${key}=${data[key]}`)
        }
    }
    return postData.join("&");
}


export function removeBookmarks(
    oprions: {
        data: { uid: string },
        success: (res: any) => void
    }) {
    httpInstance({
        url: "/bookmarks/del",
        method: "post",
        data: formatData(oprions.data),
    }).then((res) => {
        oprions.success(res.data);
    })
}



