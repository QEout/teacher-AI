import { createBrowserRouter } from "react-router-dom";
import MainLayout from "~/layouts/MainLayout";

import OCR from "../pages/ocr";
import MediaDevice from "../pages/media_device";
import Webview from "../pages/webview";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <OCR />,
      },
      {
        path: "/media_device",
        element: <MediaDevice />,
      },
    ],
  },
  {
    path: "/webview",
    element: <Webview />,
  },
]);

export default router;
