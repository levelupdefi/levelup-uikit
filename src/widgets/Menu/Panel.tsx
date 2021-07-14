import React from "react";
import styled from "styled-components";
import PanelBody from "./PanelBody";
import PanelFooter from "./PanelFooter";
import { SIDEBAR_WIDTH_REDUCED, SIDEBAR_WIDTH_FULL } from "./config";
import { PanelProps, PushedProps } from "./types";

interface Props extends PanelProps, PushedProps {
  showMenu: boolean;
  isMobile: boolean;
}

const StyledPanel = styled.div<{ isPushed: boolean; showMenu: boolean }>`
  padding: 5px 5px;
  display: flex;
  justify-content: flex-start;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.nav.background};
  transition: padding-top 0.2s, width 0.2s;
  overflow: ${({ isPushed }) => (isPushed ? "initial" : "hidden")};
  transform: translate3d(0, 0, 0);
`;

const Panel: React.FC<Props> = (props) => {
  const { isPushed, showMenu } = props;
  return (
    <StyledPanel isPushed={isPushed} showMenu={showMenu}>
      <PanelBody {...props} />
      <PanelFooter {...props} />
    </StyledPanel>
  );
};

export default Panel;
