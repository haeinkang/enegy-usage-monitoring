import { Outlet } from "react-router-dom";
import MapIcon from "./components/icons/MapIcon";
import LogoIcon from "./components/icons/LogoIcon";
import GitHubIcon from "./components/icons/GitHubIcon";
import IconNavLink from "./components/IconNavLink";

const Layout = () => {
  return (
    <div className="relative h-screen w-full">
      {/* 사이드바 */}
      <div
        className={`
          absolute top-0 left-0
          w-[70px] h-full p-4
          flex flex-col justify-between bg-white
          transition-transform duration-300
          -translate-x-full 
          md:translate-x-0
        `}
      >
        <div className="flex flex-col items-center gap-5">
          <LogoIcon />
          <nav className="flex flex-col items-center gap-2">
            <IconNavLink to="/" pageName="지도">
              <MapIcon />
            </IconNavLink>
          </nav>
        </div>
        <div>
          <IconNavLink
            to="https://github.com/haeinkang/enegy-usage-monitoring"
            pageName="Repository"
          >
            <GitHubIcon />
          </IconNavLink>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <main className="h-full w-full pl-0 md:pl-[70px]">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
