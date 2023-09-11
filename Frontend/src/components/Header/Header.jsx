import styled from "styled-components";

const HeaderStyled = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1em;
  padding: 1em;
`;

export const Header = ({ children }) => {
  return <HeaderStyled>{children}</HeaderStyled>;
};
