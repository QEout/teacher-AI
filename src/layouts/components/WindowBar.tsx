
import { appWindow } from "@tauri-apps/api/window";
import { useState } from "react";
import { useDark } from "~/hooks/useDark";
import { WindowMenu } from "./WindowMenu";
import logo from '~/assets/logo.png';
export default function WindowBar({
  showMenu = true,
}: { showMenu?: boolean }) {
  const { isDark, toggleDark } = useDark();
  const [isMaximized, setIsMaximized] = useState(false);
  const close = () => {
    appWindow.close();
  };

  const minimize = () => {
    appWindow.minimize();
  };

  const toggleMaximize = () => {
    appWindow.toggleMaximize();
    setIsMaximized(!isMaximized);
  };

  return (
    <div className="p-2 border-b border-bc-2 flex items-center bg-fill-1 justify-between w-full" data-tauri-drag-region>
      <div className="flex items-center gap-8">
      {/* logo */}
        <div className="flex items-center gap-1">
          <img src={logo} alt="logo" className="w-8 h-8" />
          <span className="font-semibold text-primary-6 italic">
            Teacher AI
          </span>
        </div>
        {
          showMenu && (
           <WindowMenu />
          )
        }
      </div>
      <div className="flex items-center space-x-2 text-tc-2">
        <button onClick={toggleDark} className="hover:bg-fill-3 rounded-md p-1">
          {isDark ? <IconMaterialSymbolsSunny /> : <IconMaterialSymbolsDarkMode />}
        </button>
        <button onClick={minimize}
          className="hover:bg-fill-3 rounded-md p-1"
        >
          <IconMingcuteMinimizeLine />
        </button>
        <button onClick={toggleMaximize} className="hover:bg-fill-3 rounded-md p-1">
          {
            isMaximized ? <IconMingcuteRestoreLine /> : <IconMingcuteSquareLine />
          }
        </button>
        <button onClick={close} className="hover:bg-fill-3 rounded-md p-1">
          <IconMingcuteCloseLine />
        </button>
      </div>
    </div>
  );
}