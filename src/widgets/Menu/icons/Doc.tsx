import React from "react";
import Svg from "../../../components/Svg/Svg";
import { SvgProps } from "../../../components/Svg/types";

interface LogoProps extends SvgProps {
  isDark: boolean;
}

const Doc: React.FC<LogoProps> = ({ isDark, ...props }) => {
  const textColor = isDark ? "#FFFFFF" : "#000000";
  return (
    <Svg viewBox="0 0 64 64" {...props}>
      <image width="64" height="64" href={isDark ? '/images/egg/doc.png' : '/images/egg/doc.png'}/>
    </Svg>
  )
};

export default Doc;
