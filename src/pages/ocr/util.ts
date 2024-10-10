import { invoke } from "@tauri-apps/api";
import { emit, listen } from "@tauri-apps/api/event";
import { BaseDirectory, readBinaryFile } from "@tauri-apps/api/fs";
import { sendNotification } from "@tauri-apps/api/notification";
import { type } from "@tauri-apps/api/os";
import { getCurrent } from "@tauri-apps/api/window";
import { GET_SHORTCUT_KEYS } from "~/registers/constants";
import { GET_HANDLER_FN } from "~/registers/screenshot/constants";
import { IScreenshotLocale } from "~/type";

export const checkFile = (
  tempFile: File,
  setImageSrc: React.Dispatch<React.SetStateAction<string | undefined>>,
  parse: (imgSrcUrl: string) => Promise<void>
) => {
  if (!tempFile) {
    return false;
  }
  if (tempFile.type.substring(0, 5) !== "image") {
    return;
  }
  const imgSrcUrl = URL.createObjectURL(tempFile);
  setImageSrc(imgSrcUrl);
  parse(imgSrcUrl);
};

export const screenshotSuccess = (
  setImageSrc: React.Dispatch<React.SetStateAction<string | undefined>>,
  parse: (imgSrcUrl: string) => Promise<void>,
  setLocale?: React.Dispatch<React.SetStateAction<IScreenshotLocale>>
) => {
  const current = getCurrent();
  listen(
    "screenshot_success",
    async (event: { payload: { locale:IScreenshotLocale; fileName: string } }) => {
      current.show();
      current.setFocus();
      const array = await readBinaryFile(
        `.teacherAI/${event.payload.fileName}.png`,
        {
          dir: BaseDirectory.Home,
        }
      );
      const blob = new Blob([new Uint8Array(array)], { type: "image/png" });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(blob);
      fileReader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setLocale?.(event.payload.locale);
        setImageSrc(imageUrl);
        parse(imageUrl);
      };
    }
  );
};

export const takeScreenShot = async () => {
  const osType = await type();
  const SHORTCUT_KEY = await GET_SHORTCUT_KEYS(osType);
  await GET_HANDLER_FN(osType)(SHORTCUT_KEY.screenshot);
}

export const takeQuickScreenshot = async (locale?: IScreenshotLocale) => {
  const fileName = `${Date.now()}_${window.crypto.randomUUID()}`;
 const result= await invoke("capture_region", {
    ...locale,
    fileName,
  });
  if (result) {
    // 截屏成功后关闭截屏窗口并通知
    sendNotification("截屏成功");
    emit("screenshot_success", {
      locale,
      fileName,
    });
  }
}


export const getBase64FromBlob = (blobSrc: string) => {
  return new Promise<string>((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", blobSrc, true);
    xhr.responseType = "blob";
    xhr.onload = () => {
      const reader = new FileReader();
      reader.readAsDataURL(xhr.response);
      reader.onload = () => {
        resolve(reader.result as string);
      };
    };
    xhr.send();
  });
}