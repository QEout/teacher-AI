import { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";
import { fabric } from "fabric";
import { readBinaryFile, BaseDirectory } from "@tauri-apps/api/fs";
import { capture_region } from "./method";

export default function Screenshot() {
  useEffect(() => {
    executeGetScreenshot();
  }, []);


  const executeGetScreenshot = async () => {
    const canvas = new fabric.Canvas("canvas", {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    });

    const searchParams = new URLSearchParams(location.search);

    // 获取全屏幕截图，渲染到canvas
    const array = await readBinaryFile(`.teacherAI/${searchParams.get("fileName")}.png`, {
      dir: BaseDirectory.Home,
    });
    const blob = new Blob([new Uint8Array(array)], { type: "image/png" });
    const fileReader = new FileReader();
    fileReader.readAsDataURL(blob);
    fileReader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      fabric.Image.fromURL(imageUrl, (image) => {
        image.scaleToWidth(canvas.width as number);
        image.scaleToHeight(canvas.height as number);
        image.selectable = false;
        canvas.add(image);

        capture_region(canvas);
      });
    };
  };

  return (
    <canvas id="canvas">
      <GlobalStyle />
    </canvas>
  );
}

const GlobalStyle = createGlobalStyle`
  :root {
    background-color: transparent !important;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      background-color: transparent !important;
    }
  }
  html, body, #root {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
  canvas {
    background-color: transparent;
    cursor: crosshair !important;
  }
`;
