import styled from "styled-components";

const InputStyled = styled.input`
  height: ${({ h }) => h};
  width: ${({ w }) => w};
  padding-left: 30px;
  border-radius: 15px;
  border: 1px solid #0f9989ff;
  transition: 0.3s;

  &:hover {
    border: 1px solid #07443d;
  }
`;

export const Input = ({ placeholder, type, h, w }) => {
  return (
    <>
      <InputStyled
        placeholder={placeholder}
        type={type}
        h={h}
        w={w}
      ></InputStyled>
    </>
  );
};
