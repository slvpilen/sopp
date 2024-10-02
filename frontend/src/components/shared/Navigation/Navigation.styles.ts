import styled from 'styled-components';

export const StyledHeaderItem = styled.div`
  display: inline-flex;
  align-items: center;
  color: var(--primary-color);

  button {
    color: inherit;
  }
`;

export const Logo = styled.img`
  height: 2.5rem;
`;

export const Title = styled.span`
  font-family: 'Open Sans';
  font-size: 1.5rem;
  line-height: 2rem;
  margin-left: 1.5rem;
  color: var(--primary-color);
`;
