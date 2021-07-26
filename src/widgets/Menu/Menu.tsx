import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { darken } from 'polished'

import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Overlay from "../../components/Overlay/Overlay";
import { PancakeRoundIcon } from "../../components/Svg";
import { Flex } from "../../components/Flex";
import Text from "../../components/Text/Text";
import Skeleton from "../../components/Skeleton/Skeleton";
import { useMatchBreakpoints } from "../../hooks";
import Logo from "./Logo";
import Panel from "./Panel";
import UserBlock from "./UserBlock";
import { NavProps } from "./types";
import { MENU_HEIGHT, SIDEBAR_WIDTH_REDUCED, SIDEBAR_WIDTH_FULL } from "./config";
import Avatar from "./Avatar";

const Wrapper = styled.div`
  max-width: 1280px;
  margin: auto;
`;

const StyledNav = styled.nav<{ showMenu: boolean }>`
  padding: 20px 5px;
  transition: top 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  transform: translate3d(0, 0, 0);
`;

const BodyWrapper = styled.div`
  position: relative;
  display: flex;
`;

const Inner = styled.div<{ isPushed: boolean; showMenu: boolean }>`
  flex-grow: 1;
  transition: margin-top 0.2s;
  transform: translate3d(0, 0, 0);
`;

const MobileOnlyOverlay = styled(Overlay)`
  position: fixed;
  height: 100%;

  ${({ theme }) => theme.mediaQueries.nav} {
    display: none;
  }
`;

const PriceLinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textSubtle};
  padding: 6px 12px;
  font-size: 20px;
  border-radius: 6px;
  margin-left: 20px;

  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.colors.primary)};
  }
`

const PriceLink = styled.a`
  display: flex;
  align-items: center;
  svg {
    transition: transform 0.3s;
  }
  :hover {
    svg {
      transform: scale(1.2);
    }
  }
`;

const SlickWrapper = styled.div`
  max-width: 200px;
  width: 200px;
`;

const SlickImage = styled.img`
  max-width: 200px;
  height: auto;
`;

const Menu: React.FC<NavProps> = ({
  account,
  login,
  logout,
  isDark,
  toggleTheme,
  langs,
  setLang,
  currentLang,
  cakePriceUsd,
  links,
  priceLink,
  profile,
  children,
}) => {
  const { isXl } = useMatchBreakpoints();
  const isMobile = isXl === false;
  const [isPushed, setIsPushed] = useState(!isMobile);
  const [showMenu, setShowMenu] = useState(true);
  const refPrevOffset = useRef(window.pageYOffset);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentOffset = window.pageYOffset;
  //     const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight;
  //     const isTopOfPage = currentOffset === 0;
  //     // Always show the menu when user reach the top
  //     if (isTopOfPage) {
  //       setShowMenu(true);
  //     }
  //     // Avoid triggering anything at the bottom because of layout shift
  //     else if (!isBottomOfPage) {
  //       if (currentOffset < refPrevOffset.current) {
  //         // Has scroll up
  //         setShowMenu(true);
  //       } else {
  //         // Has scroll down
  //         setShowMenu(false);
  //       }
  //     }
  //     refPrevOffset.current = currentOffset;
  //   };
  //   const throttledHandleScroll = throttle(handleScroll, 200);

  //   window.addEventListener("scroll", throttledHandleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", throttledHandleScroll);
  //   };
  // }, []);

  // Find the home link if provided
  const homeLink = links.find((link) => link.label === "Home");

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    // speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Wrapper>
      <StyledNav showMenu={showMenu}>
        <Logo
          isPushed={isPushed}
          togglePush={() => setIsPushed((prevState: boolean) => !prevState)}
          isDark={isDark}
          href={homeLink?.href ?? "/"}
        />
        <SlickWrapper>
          <Slider {...settings}>
            <div>
              <SlickImage src="/images/slick/slick-1.png" alt="slide 1" />
            </div>
            <div>
              <SlickImage src="/images/slick/slick-2.png" alt="slide 2" />
            </div>
            <div>
              <SlickImage src="/images/slick/slick-3.png" alt="slide 3" />
            </div>
          </Slider>
        </SlickWrapper>
        <Flex>
          <PriceLinkWrapper>
            {cakePriceUsd ? (
              <PriceLink href={priceLink} target="_blank">
                <PancakeRoundIcon width="24px" mr="8px" />
                <Text color="#1b1464">{`$${cakePriceUsd.toFixed(3)}`}</Text>
              </PriceLink>
            ) : (
              <Skeleton width={80} height={24} />
            )}
          </PriceLinkWrapper>
          <UserBlock account={account} login={login} logout={logout} />
          {/* {profile && <Avatar profile={profile} />} */}
        </Flex>
      </StyledNav>
      <Panel
        isPushed={isPushed}
        isMobile={isMobile}
        showMenu={showMenu}
        isDark={isDark}
        toggleTheme={toggleTheme}
        langs={langs}
        setLang={setLang}
        currentLang={currentLang}
        cakePriceUsd={cakePriceUsd}
        pushNav={setIsPushed}
        links={links}
        priceLink={priceLink}
      />
      <BodyWrapper>
        <Inner isPushed={isPushed} showMenu={showMenu}>
          {children}
        </Inner>
        <MobileOnlyOverlay show={isPushed} onClick={() => setIsPushed(false)} role="presentation" />
      </BodyWrapper>
    </Wrapper>
  );
};

export default Menu;
