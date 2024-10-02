import { AccountCircleOutlined } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  IconButton,
  MenuItem as MenuItemMUI,
  Menu as MenuMUI,
} from "@mui/material";
import { useRef } from "react";
import { useToggleState } from "src/hooks/useToggleState";

type MenuItem = {
  title: string;
  onClick: () => void;
};

type Props = {
  iconType: "menu" | "account";
  items: MenuItem[];
};

export function Menu({ iconType, items }: Props) {
  const accountAnchorRef = useRef<HTMLButtonElement>(null);
  const [isMenuOpen, toggleIsMenuOpen] = useToggleState();

  return (
    <>
      <IconButton
        size="large"
        aria-haspopup="true"
        ref={accountAnchorRef}
        onClick={toggleIsMenuOpen}
      >
        {iconType === "menu" && <MenuIcon sx={{ color: "white" }} />}
        {iconType === "account" && (
          <AccountCircleOutlined sx={{ color: "white" }} />
        )}
      </IconButton>

      <MenuMUI
        anchorEl={accountAnchorRef.current}
        keepMounted
        open={isMenuOpen}
        onClose={toggleIsMenuOpen}
      >
        {items.map((item, index) => (
          <MenuItemMUI key={index} onClick={item.onClick}>
            {item.title}
          </MenuItemMUI>
        ))}
      </MenuMUI>
    </>
  );
}
