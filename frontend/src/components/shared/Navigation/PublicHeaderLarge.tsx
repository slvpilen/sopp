import logo from "src/assets/images/logo.png";
import { PublicNavigation } from "./PublicNavigation";
import { NavigationItem } from "./Navigation.types";
import { StyledHeaderItem, Logo, Title } from "./Navigation.styles";
type Props = {
  items: NavigationItem[];
};

export function PublicHeaderLarge({ items }: Props) {
  return (
    <>
      <StyledHeaderItem>
        <Logo src={logo} alt="WSopp" />
        <Title>WSopp</Title>
      </StyledHeaderItem>

      <StyledHeaderItem>
        <PublicNavigation items={items} />
      </StyledHeaderItem>
    </>
  );
}
