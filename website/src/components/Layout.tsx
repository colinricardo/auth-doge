import React, { useState, createRef } from "react";
import Router from "next/router";
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem,
} from "baseui/header-navigation";
import { Button } from "baseui/button";
import { StyledLink } from "baseui/link";
import { HideOnMobile, ShowOnMobile, Spacer } from "../styles/responsive";
import { Menu as MenuIcon } from "baseui/icon";
import { StatefulMenu } from "baseui/menu";
import { Display4, Paragraph1 } from "baseui/typography";
import { styled } from "baseui";
import { flex } from "../styles/flex";

const Container = styled("div", {
  fontFamily: `Lato`,
  height: `100%`,
  width: `100%`,
});

const navItems = [
  {
    label: "Home",
    link: "/home",
  },
  {
    label: "Profile",
    link: "/profile",
  },
];

const Link = styled(StyledLink, ({ $theme }) => ({
  textDecoration: "none",
  color: $theme.colors.black,
}));

const FooterSection = styled("div", ({ $theme }) => ({
  ...flex.flex,
  ...flex.col,
  ...flex.centerXY,
  height: "240px",
  background: $theme.colors.primary,
  textAlign: "center",
}));

const renderMobileNav = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <ShowOnMobile>
      <StyledNavigationList $align={ALIGN.right}>
        <StyledNavigationItem>
          {menuIsOpen ? (
            <StatefulMenu
              items={navItems}
              onItemSelect={(obj) => {
                setMenuIsOpen(false);
                Router.push(obj.item.link);
              }}
              rootRef={createRef()}
              overrides={{
                List: {
                  style: {
                    position: "fixed",
                    top: 0,
                    right: 0,
                    width: "100vw",
                    textAlign: "center",
                  },
                },
              }}
            />
          ) : (
            <span onClick={() => setMenuIsOpen(!menuIsOpen)}>
              <MenuIcon size={32} />
            </span>
          )}
        </StyledNavigationItem>
        <Spacer w="c" />
      </StyledNavigationList>
    </ShowOnMobile>
  );
};

const renderNonMobileNav = () => {
  return (
    <HideOnMobile>
      <StyledNavigationList $align={ALIGN.right}>
        <StyledNavigationItem>
          <Link color="white" href="/profile">
            <Button>Profile</Button>
          </Link>
        </StyledNavigationItem>
        <Spacer w="c" />
      </StyledNavigationList>
    </HideOnMobile>
  );
};

const renderNavbar = () => {
  return (
    <HeaderNavigation
      overrides={{
        Root: {
          style: {
            borderBottom: "none",
          },
        },
      }}
    >
      <StyledNavigationList $align={ALIGN.left}>
        <StyledNavigationItem>
          <Link color="white" href="/">
            <Display4
              color="primary"
              overrides={{
                Block: {
                  style: {
                    fontWeight: "bold",
                  },
                },
              }}
            >
              AuthDoge
            </Display4>
          </Link>
        </StyledNavigationItem>
      </StyledNavigationList>
      <StyledNavigationList $align={ALIGN.center} />
      {renderMobileNav()}
      {renderNonMobileNav()}
    </HeaderNavigation>
  );
};

const renderFooter = () => {
  return (
    <FooterSection>
      <Paragraph1 color="white">
        <a
          target="__blank"
          style={{
            color: "white",
          }}
          href="https://github.com/colinricardo/auth-doge"
        >
          GitHub code
        </a>
      </Paragraph1>
    </FooterSection>
  );
};

const Layout: React.FC = ({ children }) => {
  return (
    <Container>
      {renderNavbar()}
      {children}
      {renderFooter()}
    </Container>
  );
};

export default Layout;
