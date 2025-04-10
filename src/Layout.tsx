import { Outlet } from "react-router-dom";
import MapIcon from "./components/icons/MapIcon";
import QuestionCircleIcon from "./components/icons/QuestionCircleIcon";
import LogoIcon from "./components/icons/LogoIcon";
import GitHubIcon from "./components/icons/GitHubIcon";
import IconNavLink from "./components/IconNavLink";
import { FaGithub } from "react-icons/fa";

const Layout = () => {
  return (
    <div className="grid grid-cols-[auto,1fr] h-screen">
      <div className="w-[70px] h-full bg-white flex flex-col justify-between p-4">
        {/* 상단 로고 + 네비 */}
        <div className="flex flex-col items-center gap-5">
          <LogoIcon />
          <nav className="flex flex-col items-center gap-2">
            <IconNavLink to="/" pageName="지도">
              <MapIcon />
            </IconNavLink>
          </nav>
        </div>

        {/* 하단 외부링크 */}
        <div>
          <IconNavLink
            to="https://github.com/haeinkang/enegy-usage-monitoring"
            pageName="Repository"
          >
            <GitHubIcon />
          </IconNavLink>
        </div>
      </div>

      <main>
        <div className="h-screen">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
