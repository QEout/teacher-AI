import { invoke } from "@tauri-apps/api";
import { ShortcutHandler } from "@tauri-apps/api/globalShortcut";
import { OsType } from "@tauri-apps/api/os";
import { appWindow, getAll } from "@tauri-apps/api/window";
import { createWebviewWindow } from "../../utils";
import { Command } from "@tauri-apps/api/shell";
import { homeDir } from "@tauri-apps/api/path";
import { sendNotification } from "@tauri-apps/api/notification";

export const DEFAULT_WINDOW_OPTION = {
  url: "/webview",
  alwaysOnTop: true,
  decorations: false, // 去除边框与标题栏
  resizable: false, // 禁止调整窗口大小
  transparent: true, // 窗口透明
  fullscreen: true,
};

export const GET_HANDLER_FN = (osType: OsType) => {
  const HANDLER_FN: HandlerFnType = {
    Linux: async () => {
      console.log("Linux 调用截屏");
    },
    Windows_NT: async (shortcut) => {
      // 获取所有窗口
      const webViews = getAll();

      const webview = webViews.find((webview) => {
        return webview.label.includes("screenshot");
      });
      console.log("截屏", shortcut);

      if (webview) {
        // 防止截屏窗口没有关闭，执行关闭
        webview?.close();
        return;
      } else {
        // 获取截屏窗口的位置，生成截取全屏的图片
        const factor = await appWindow?.scaleFactor();
        const innerPosition = await appWindow?.innerPosition();
        const position = innerPosition?.toLogical(parseInt(factor as any));
        console.log(position);
        const fileName = `${Date.now()}_${window.crypto.randomUUID()}`;

        (await invoke("capture_full", {
          position,
          fileName,
        })) as Array<number>;

        createWebviewWindow("screenshot", {
          ...DEFAULT_WINDOW_OPTION,
          url: `/webview?fileName=${fileName}`,
        });
      }
    },
    Darwin: async () => {
      const homeDirPath = await homeDir();
      console.log("Mac 调用截屏");
      const fileName = `${Date.now()}_${window.crypto.randomUUID()}`;
      const command = new Command("screencapture", [
        "-i",
        `${homeDirPath}.teacherAI/${fileName}.png`,
      ]);
      const { code } = await command.execute();
      console.log(code);
      if (code === 0) {
        sendNotification("截屏成功");
        appWindow.emit("screenshot_success", { fileName });
      }
    },
  };
  return HANDLER_FN[osType];
};

export type HandlerFnType = {
  [key in OsType]: ShortcutHandler;
};
