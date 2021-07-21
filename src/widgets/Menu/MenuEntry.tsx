import styled, { keyframes, DefaultTheme } from "styled-components";
import { MENU_ENTRY_HEIGHT } from "./config";

export interface Props {
  secondary?: boolean;
  isActive?: boolean;
  theme: DefaultTheme;
}

const rainbowAnimation = keyframes`
  0%,
  100% {
    background-position: 0 0;
  }
  50% {
    background-position: 100% 0;
  }
`;

const LinkLabel = styled.div<{ isPushed: boolean }>`
  color: ${({ isPushed, theme }) => (isPushed ? theme.colors.textSubtle : "transparent")};
  transition: color 0.4s;
  flex-grow: 1;
`;

const MenuEntry = styled.div<Props>`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 5px;
  font-size: 12px;
  background-color: ${({ secondary, theme }) => (secondary ? theme.colors.background : "transparent")};
  border-bottom: ${({ isActive, theme }) => (isActive ? `2px solid #c10015` : "none")};

  a {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    color: ${({ isActive, theme }) => isActive ? `#c10015` : `#1b1464`};
  }

  div {
    font-weight: ${({ isActive }) => isActive ? "bold" : "normal"};
    color: ${({ isActive, theme }) => isActive ? `#c10015` : `#1b1464`};
  }

  svg {
    fill: ${({ isActive, theme }) => isActive ? `#c10015` : `#1b1464`};
  }

  &:hover {
    background-color: #F8AF11;
  }

  // Safari fix
  flex-shrink: 0;

  &.rainbow {
    -webkit-background-clip: text;
    animation: ${rainbowAnimation} 3s ease-in-out infinite;
    background: ${({ theme }) => theme.colors.gradients.bubblegum};
    background-size: 200% 100%;
    font-weight: bold;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: ${({ secondary }) => (secondary ? "14px" : "16px")};
    padding: 0 5px;
    height: ${MENU_ENTRY_HEIGHT}px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    padding: ${({ secondary }) => (secondary ? "0 32px" : "0 16px")};
  }
`;
MenuEntry.defaultProps = {
  secondary: false,
  isActive: false,
  role: "button",
};

export { MenuEntry, LinkLabel };
