import { Flex } from "@chakra-ui/react";
import styled from "styled-components";
import { InputHeader } from "../Inputs/Input";
import { MobileMenu } from "../Menu/MobileMenu";
import useWidth from "../../hooks/useWidth";
import { DesktopMenu } from "../Menu/DesktopMenu";
import { Link, useLocation } from "react-router-dom";

const HeaderStyled = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1em;
  padding: 1em;
`;

export const Header = () => {
  const { width } = useWidth();
  const { pathname } = useLocation();
  const Menu = width < 500 ? MobileMenu : DesktopMenu;
  return (
    <HeaderStyled>
      <Flex align="center" gap="1em">
        <div>
          <img
            src="https://res.cloudinary.com/dhr13yihn/image/upload/v1694439036/proyectoEventland/assets/OIG_gsdzjv.jpg"
            alt="Eventland logo"
            className="logo"
          />
        </div>
        <div>
          <InputHeader />
        </div>
      </Flex>
      <Menu
        switchMode={
          pathname === "/org" ? (
            <Link to="/">Eventland para usuarios</Link>
          ) : (
            <Link to="/org">Crea tus propios eventos</Link>
          )
        }
        login={
          pathname === "/org" ? (
            <Link to="/loginorg">Inicia sesión</Link>
          ) : (
            <Link to="/login">Inicia sesión</Link>
          )
        }
        register={
          pathname === "/org" ? (
            <Link to="/registerorg">Regístrate</Link>
          ) : (
            <Link to="/register">Regístrate</Link>
          )
        }
      />
    </HeaderStyled>
  );
};
