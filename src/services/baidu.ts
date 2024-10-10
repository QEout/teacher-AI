import { IRequest, request } from "./util";

class BaiduService {
  constructor(private request: IRequest) {}
  //调用百度access_token
  private async getOCRAccessToken() {
    //获取sessionStorage中的access_token和expires_in
    const accessToken = localStorage.getItem("access_token");
    const expires_in = localStorage.getItem("expires_in");
    //判断是否过期
    if (
      accessToken &&
      expires_in &&
      new Date().getTime() < Number(expires_in) - 60000
    ) {
      return accessToken;
    }
    const res = await this.request<{
      access_token: string;
      expires_in: number;
    }>(
      `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${
        import.meta.env.VITE_BAIDU_OCR_API_KEY
      }&client_secret=${import.meta.env.VITE_BAIDU_OCR_SECRET_KEY}`,
      {
        method: "POST",
      }
    );
    //设置sessionStorage,过期时间为7200秒
    localStorage.setItem("access_token", res.access_token);
    localStorage.setItem(
      "expires_in",
      String(new Date().getTime() + res.expires_in * 1000)
    );
    return res.access_token;
  }

  private async getERNIEAccessToken() {
    //获取sessionStorage中的access_token和expires_in
    const accessToken = localStorage.getItem("ernie_access_token");
    const expires_in = localStorage.getItem("ernie_expires_in");
    //判断是否过期
    if (
      accessToken &&
      expires_in &&
      new Date().getTime() < Number(expires_in) - 60000
    ) {
      return accessToken;
    }
    const res = await this.request<{
      access_token: string;
      expires_in: number;
    }>(
      `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${
        import.meta.env.VITE_BAIDU_ERNIE_BOT_API_KEY
      }&client_secret=${import.meta.env.VITE_BAIDU_ERNIE_BOT_SECRET_KEY}`,
      {
        method: "POST",
      }
    );
    //设置sessionStorage,过期时间为7200秒
    localStorage.setItem("ernie_access_token", res.access_token);
    localStorage.setItem(
      "ernie_expires_in",
      String(new Date().getTime() + res.expires_in * 1000)
    );
    return res.access_token;
  }

  // 调用百度OCR
  async getOCR(image: string) {
    const accessToken = await this.getOCRAccessToken();
    return this.request<{
      words_result: {
        words: string;
      }[];
    }>(
      `https://aip.baidubce.com/${
        import.meta.env.VITE_OCR_API_URL
      }?access_token=${accessToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        // body: `image=${encodeURIComponent(image)}` as any,
        body: {
          type: "Form",
          payload: {
            image,
          },
        },
      }
    );
  }

  // 调用百度文心一言
  async getScoreByAi(userAnswer: string, system: string) {
    const accessToken = await this.getERNIEAccessToken();
    return this.request<{
      result: string;
    }>(
      `https://aip.baidubce.com/${
        import.meta.env.VITE_ERNIE_BOT_API_URL
      }?access_token=${accessToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          type: "Json",
          payload: {
            system,
            messages: [
              {
                role: "user",
                content: "用户答案为：" + userAnswer,
              },
            ],
          },
        },
      }
    );
  }
}

export const baibuService = new BaiduService(request);
