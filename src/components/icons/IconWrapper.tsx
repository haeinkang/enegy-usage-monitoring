interface IconWrapperProps {
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
}

const IconWrapper: React.FC<IconWrapperProps> = ({
  children,
  className = "",
  isActive = false,
}) => (
  <div
    className={`
      transition-colors
      ${isActive ? "text-customGreen" : "group-hover:text-customGreen"}
      ${className}
    `}
  >
    {children}
  </div>
);

export default IconWrapper;
