import { Link, useLocation } from "react-router-dom";
import React, { useMemo } from "react";
import IconWrapper from "./icons/IconWrapper";

interface IconNavLinkProps {
  to: string;
  pageName: string;
  className?: string;
  width?: string;
  height?: string;
  children: React.ReactNode;
}

const isExternalLink = (url: string) => /^https?:\/\//.test(url);

const IconNavLink: React.FC<IconNavLinkProps> = React.memo(
  ({
    to,
    pageName,
    className = "",
    width = "40px",
    height = "40px",
    children,
  }) => {
    const pathname = useLocation().pathname;
    const isActive = pathname === to;
    const isExternal = isExternalLink(to);

    const sharedClasses = useMemo(
      () =>
        `
        group relative flex items-center justify-center rounded-md transition
        ${isActive ? "bg-customMint" : "hover:bg-customMint"}
        ${className}
      `,
      [isActive, className]
    );

    const iconWrapperClass = useMemo(
      () => (isActive ? "text-customGreen" : ""),
      [isActive]
    );

    const content = useMemo(
      () => (
        <>
          <IconWrapper className={iconWrapperClass}>{children}</IconWrapper>
          <div
            className={`
              absolute left-full top-1/2 -translate-y-1/2 ml-2 px-4 py-2.5
              text-base text-gray-800 bg-white border border-gray-200 rounded-md
              whitespace-nowrap opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100
              transition-all duration-200 z-10
            `}
          >
            {pageName}
          </div>
        </>
      ),
      [iconWrapperClass, children, pageName]
    );

    return isExternal ? (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className={sharedClasses}
        style={{ width, height }}
      >
        {content}
      </a>
    ) : (
      <Link to={to} className={sharedClasses} style={{ width, height }}>
        {content}
      </Link>
    );
  }
);

export default IconNavLink;
