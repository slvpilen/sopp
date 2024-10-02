import styled from "styled-components";
import { PublicHeader } from "../Navigation/PublicHeader";

export const device = {
  mobile: `(min-width: 425px)`,
  tablet: `(min-width: 768px)`,
  laptop: `(min-width: 1440px)`,
  desktop: `(min-width: 2560px)`,
};

const StyledPublicPage = styled.main`
  margin-top: 4rem;
  padding: 2rem 0.5rem;

  @media ${device.tablet} {
    padding: 2rem 3rem;
  }

  @media ${device.laptop} {
    padding: 2rem 5rem;
  }

  @media ${device.desktop} {
    padding: 2rem 8rem;
  }
`;

type PublicPageProps = {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode | React.ReactNode[];
};

export function PublicPage({ className, style, children }: PublicPageProps) {
  return (
    <StyledPublicPage className={className} style={style}>
      <PublicHeader />
      {children}
    </StyledPublicPage>
  );
}
