import { Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { NavigationItem as NavigationItemType } from "./Navigation.types";
type Props = {
  items: NavigationItemType[];
};

export function PublicNavigation({ items }: Props) {
  const location = useLocation();
  const navigate = useNavigate();

  const activeNavItemIndex = items.findIndex(
    (x) =>
      location.pathname.match(/[^/]+/g)?.at(0) === x.path.match(/[^/]+/g)?.at(0)
  );

  const navigateToNewPath = (path: string) => {
    navigate(path);
  };

  return (
    <nav className="flex gap-4">
      {items.map((navItem, index) => (
        <NavigationItem
          key={navItem.path}
          title={navItem.name}
          path={navItem.path}
          active={index === activeNavItemIndex}
          onClick={navigateToNewPath}
        />
      ))}
    </nav>
  );
}

type NavigationItemProps = {
  title: string;
  path: string;
  active: boolean;
  onClick: (path: string) => void;
};

function NavigationItem({ title, path, active, onClick }: NavigationItemProps) {
  const handleOnClick = () => {
    onClick(path);
  };

  return (
    <Container active={active} onClick={handleOnClick}>
      <Typography variant="subtitle2">{title}</Typography>
    </Container>
  );
}

type ContainerProps = {
  active: boolean;
};

const Container = styled.div<ContainerProps>`
  padding: 0 4px;
  cursor: pointer;

  &:hover {
    ${(props) =>
      !props.active &&
      css`
        border-bottom: 2px solid lightgray;
      `}
  }

  ${(props) =>
    props.active &&
    css`
      border-bottom: 2px solid white;
    `}
`;
