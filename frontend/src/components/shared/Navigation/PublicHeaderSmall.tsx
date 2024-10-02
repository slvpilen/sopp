import { useNavigate } from "react-router-dom";
import logo from "src/assets/images/logo.png";
import Menu from "../Menu";
import { Logo, StyledHeaderItem } from "./Navigation.styles";
import { NavigationItem } from "./Navigation.types";

type Props = {
  items: NavigationItem[];
};

export function PublicHeaderSmall({ items }: Props) {
  const navigate = useNavigate();

  const menuItems = items.map((item) => ({
    title: item.name,
    onClick: () => navigate(item.path),
  }));

  return (
    <>
      <StyledHeaderItem>
        <Logo src={logo} alt="WFinans" />
      </StyledHeaderItem>

      <Menu iconType="menu" items={menuItems} />
    </>
  );
}
