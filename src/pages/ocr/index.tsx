import { useCallback, useEffect, useRef, useState } from "react";
import { IconDown,IconUp } from '@arco-design/web-react/icon';
import { Input, Image, Button, Spin } from "@arco-design/web-react";
const TextArea = Input.TextArea;

import { OCRWrapper } from "./styled";
import { baibuService } from "~/services/baidu";
import { checkFile, getBase64FromBlob, screenshotSuccess, takeQuickScreenshot, takeScreenShot } from "./util";
import { IScreenshotLocale } from "~/type";
import animation from "~/assets/ai-dog.json";
import Lottie from "lottie-react";


export default function Home() {
  const [imageSrc, setImageSrc] = useState<string>();
  const [parseText, setParseText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [prompt, setPrompt] = useState<string>("假如你是语文老师,请根据参考答案来给用户答案打分(分值由参考答案的每道题目的参考分值决定). \n\n返回示例如下: '用户得分为: 序号x:xx分, 序号x:xx分, ...(无需返回详细解析)。参考答案如下：")
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [aiText, setAiText] = useState<string>("");
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const parse = useCallback(async (imgSrcUrl: string) => {
    setParseText("");
    setLoading(true);
    let sentences = "";
    try {
      const base64 = await getBase64FromBlob(imgSrcUrl);
      const text = await baibuService.getOCR(base64);
      sentences = text.words_result.map((item) => item.words).join("\n");
      setParseText(sentences);
    } finally {
      setLoading(false);
    }
    setAiLoading(true);
    try {
      const aiRes = await baibuService.getScoreByAi(sentences, prompt);
      setAiText(aiRes.result);
    } finally {
      setAiLoading(false);
    }
  }, []);

  const handleClick = useCallback(() => {
    const inputFile = inputFileRef.current as HTMLInputElement;
    inputFile.click();
    inputFile.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const tempFiles = target.files as FileList;

      checkFile(tempFiles[0], setImageSrc, parse);
      target.value = ""; // 同一个文件做两次上传操作，第二次无效解决办法
    };
  }, []);
  const [locale, setLocale] = useState<IScreenshotLocale>();
  useEffect(() => {
    // 监听截图事件
    screenshotSuccess(setImageSrc, parse, setLocale);
  }, []);

  return (
    <OCRWrapper className="h-full ">
      <div className="flex justify-around w-full h-full relative overflow-y-auto p-4 gap-4">
        <div className="flex flex-col gap-2 w-1/2 sticky left-0 top-0">
          <div className="relative overflow-hidden flex justify-center items-center shadow-lg border border-bc-2 w-full h-full">
            <Image
              height="100%"
              src={imageSrc}
              alt={imageSrc}
            />
          </div>
          <Button type="primary" loading={loading} onClick={handleClick}>
            {loading ? "正在解析" : "上传图片"}
          </Button>
          {/* 截取屏幕 */}
          <div className="flex justify-between items-center gap-2">
            <div>
              {locale && <span className="text-tc-2">截图区域：{
                `起始点: ${locale.x},${locale.y}` + ' 宽度:' + locale.width + ' 高度:' + locale.height
              }</span>}
            </div>
            <div className="flex gap-2">
              <Button type="default" loading={loading} onClick={takeScreenShot}>
                截图
              </Button>
              <Button type="primary"
                disabled={!locale}
                onClick={() => takeQuickScreenshot(locale)}
              >
                快捷截图
              </Button>
            </div>
          </div>
        </div>
        <div className="w-1/2 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <div className="w-full h-80 bg-bc-1 overflow-y-auto  p-4 break-words rounded-md whitespace-pre-wrap">
              {loading ? <Spin /> : (parseText || <span className="text-tc-2">这里是用户答案区域，根据上传的图片或截图识别用户答案并显示在这里</span>)}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
            <span className="text-sm text-tc-2">判分规则</span>
            <button onClick={() => setCollapsed(!collapsed)} className="p-1 hover:bg-bc-1 rounded">
              {collapsed ? <IconDown />: <IconUp />} 
            </button>
            </div>
           { !collapsed &&
            <TextArea
              value={prompt}
              onChange={(value) => setPrompt(value)}
              style={{minHeight:'208px'}}
            />}
            </div>
          <div className="flex flex-col flex-1 gap-2">
            <span className="text-sm text-tc-2">AI评分结果</span>
            <div className="w-full flex gap-2 flex-1">
              <Lottie animationData={animation} style={{ width: 110, height: 110 }} />
              <div className="flex-1 rounded-lg rounded-tl-none border-2 border-bc-2 my-4 text-green-500 font-semibold p-2 overflow-y-auto break-words whitespace-pre-wrap">
                {aiLoading ? <Spin /> : (aiText || <span className="text-tc-2 font-normal">这里是AI评分结果区域，根据用户答案和判分规则计算得分并显示在这里</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <input
        type="file"
        ref={inputFileRef}
        id="fileUpload"
        accept="image/*"
        hidden
      />
    </OCRWrapper>
  );
}

