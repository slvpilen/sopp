import styled from "styled-components";
import { PublicHeaderLarge } from "./PublicHeaderLarge";
import { NavigationItem } from "./Navigation.types";
import { PublicPaths } from "src/Routes";
import { useMediaQuery } from "@mui/material";
import { Breakpoint } from "src/utils/breakpoints";
import { PublicHeaderSmall } from "./PublicHeaderSmall";

export function PublicHeader() {
  const isLargeScreen = useMediaQuery(`(min-width:${Breakpoint.small})`);

  const navItems: NavigationItem[] = [
    {
      path: PublicPaths.base,
      name: "Hjem",
    },
    {
      path: PublicPaths.quiz,
      name: "Quiz",
    },
  ];

  return (
    <StyledHeader>
      {isLargeScreen ? (
        <PublicHeaderLarge items={navItems} />
      ) : (
        <PublicHeaderSmall items={navItems} />
      )}
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-shrink: 0;
  width: 100%;
  min-height: 4rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  padding: 0 2rem;
  background: #000;
  color: var(--primary-color);
  border-bottom: 1px solid var(--quaternary-color);
`;
