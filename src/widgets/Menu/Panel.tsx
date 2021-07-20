import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { SvgProps } from "../../components/Svg";
import Flex from "../../components/Flex/Flex";
import Link from "../../components/Link/Link";
import * as IconModule from "./icons";
import Accordion from "./Accordion";
import { MenuEntry, LinkLabel } from "./MenuEntry";
import MenuLink from "./MenuLink";
import { socials } from "./config";
import { PanelProps, PushedProps } from "./types";

interface Props extends PanelProps, PushedProps {
  showMenu: boolean;
  isMobile: boolean;
}

const Icons = (IconModule as unknown) as { [key: string]: React.FC<SvgProps> };

const StyledPanel = styled.div`
  padding: 1px 20px 0 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  flex-shrink: 0;
  border-radius: 0;
  background-color: ${({ theme }) => theme.nav.background};
  transition: padding-top 0.2s, width 0.2s;
  overflow: initial;
  transform: translate3d(0, 0, 0);

  ${({ theme }) => theme.mediaQueries.md} {
    border-radius: 15px 15px 0 0;
  }
`;

const Panel: React.FC<Props> = (props) => {
  const { links, isPushed, isMobile, showMenu, pushNav } = props;
  const location = useLocation();
  // Close the menu when a user clicks a link on mobile
  const handleClick = isMobile ? () => pushNav(false) : undefined;

  return (
    <StyledPanel>
      <Flex>
        {links.map((entry) => {
          const Icon = Icons[entry.icon];
          const iconElement = <Icon width="24px" mr="8px" />;
          const calloutClass = entry.calloutClass ? entry.calloutClass : undefined;

          if (entry.items) {
            return (
              <Accordion
                key={entry.label}
                isPushed={isPushed}
                pushNav={pushNav}
                icon={iconElement}
                label={entry.label}
                initialOpenState={entry.initialOpenState}
                className={calloutClass}
              >
                {isPushed &&
                  entry.items.map((item) => (
                    // <MenuEntry key={item.href} secondary isActive={item.href === location.pathname} onClick={handleClick}>
                    <MenuEntry key={item.href} secondary isActive={location.pathname.includes(item.href)} onClick={handleClick}>
                      <MenuLink href={item.href}>{item.label}</MenuLink>
                    </MenuEntry>
                  ))}
              </Accordion>
            );
          }
          return (
            // <MenuEntry key={entry.label} isActive={entry.href === location.pathname} className={calloutClass}>
            <MenuEntry key={entry.label} isActive={entry.href === location.pathname || entry.href !== undefined && location.pathname.includes(`${entry.href}/`)} className={calloutClass}>
              <MenuLink href={entry.href} onClick={handleClick}>
                {iconElement}
                <LinkLabel isPushed={isPushed}>{entry.label}</LinkLabel>
              </MenuLink>
            </MenuEntry>
          );
        })}
      </Flex>
      <Flex flex="1" justifyContent="flex-end">
        {socials.map((social, index) => {
          const Icon = Icons[social.icon];
          const iconProps = { width: "24px", color: "#1b1464", style: { cursor: "pointer" } };
          const mr = index < socials.length - 1 ? "8px" : 0;
          return (
            <Link external key={social.label} href={social.href} aria-label={social.label} mr={mr}>
              <Icon {...iconProps} />
            </Link>
          );
        })}
      </Flex>
    </StyledPanel>
  );
};

export default Panel;
