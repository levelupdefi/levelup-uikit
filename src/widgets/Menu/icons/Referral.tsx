import React from "react";
import Svg from "../../../components/Svg/Svg";
import { SvgProps } from "../../../components/Svg/types";

interface LogoProps extends SvgProps {
  isDark: boolean;
}

const Referral: React.FC<LogoProps> = ({ isDark, ...props }) => {
  const textColor = isDark ? "#FFFFFF" : "#000000";
  return (
    <Svg viewBox="0 0 48 48" {...props}>
      <image width="48" height="48" href={isDark ? '/images/egg/referral.png' : '/images/egg/referral.png'}/>
    </Svg>
  )
};

export default Referral;
