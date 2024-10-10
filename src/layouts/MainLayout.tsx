import { Outlet } from "react-router-dom";
import WindowBar from "./components/WindowBar";

function MainLayout() {

  return (
    <div className="w-screen h-screen">
      <WindowBar />
      <div className="h-[calc(100vh-49px)] w-screen overflow-x-hidden relative">
      <Outlet /></div>
    {/* new date() 获取当前时区
      {
        new Da
      }
      {/* <footer className=" mt-10 flex justify-center items-center">
        <div className="toggle-dark cursor-pointer" onClick={toggleDark}>
          {isDark ? <MaterialSymbolsSunny /> : <MaterialSymbolsDarkMode />}
        </div>
      </footer> */}
    </div>
  );
}

export default MainLayout;
