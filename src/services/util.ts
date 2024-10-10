import { Message } from "@arco-design/web-react";
import { Body, fetch, FetchOptions, ResponseType } from "@tauri-apps/api/http";
//封装fetch请求
export function request<T>(url: string, options: FetchOptions) {
  return new Promise<T>((resolve, reject) => {
    fetch(url, options)
      .then((res: any) => {
        if (res.ok) {
          const data = res.data;
          if (data.error_msg) {
            reject(data.error_msg);
            Message.error(data.error_msg);
          } else {
            resolve(data);
          }
        } else {
          reject(res);
          Message.error("请求失败");
        }
      })

      .catch((error: Error) => {
        reject(error);
        Message.error(error.message);
      });
  });
}

export type IRequest = typeof request;
