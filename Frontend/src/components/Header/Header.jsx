import { Flex, Icon } from "@chakra-ui/react";
import styled from "styled-components";
import { InputHeader } from "../Inputs/Input";
import { MobileMenu } from "../Menu/MobileMenu";
import useWidth from "../../hooks/useWidth";
import { DesktopMenu } from "../Menu/DesktopMenu";
import { Link, useLocation } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useOrgAuth } from "../../context/authOrgContext";
import { useAuth } from "../../context/authContext";
import "./Header.css";

const HeaderStyled = styled.header`
  display: flex;
  align-items: center;
  gap: 1em;
  padding: 1em;
`;

export const Header = () => {
  const { organization, logoutOrg } = useOrgAuth();
  const { user, logout } = useAuth();
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
          pathname.includes("org") ? (
            <Link onClick={logoutOrg}>Eventland para usuarios</Link>
          ) : (
            <Link onClick={logout}>Crea tus propios eventos</Link>
          )
        }
        login={
          pathname.includes("org") ? (
            <Link to="/loginorg">Inicia sesión</Link>
          ) : (
            <Link to="/login">Inicia sesión</Link>
          )
        }
        register={
          pathname.includes("org") ? (
            <Link to="/registerorg">Regístrate</Link>
          ) : (
            <Link to="/register">Regístrate</Link>
          )
        }
        profile={
          pathname.includes("org") ? (
            <Flex align="center">
              <Icon as={CgProfile} />
              <Link to="/organizationprofile">{organization?.email}</Link>
            </Flex>
          ) : (
            <Flex align="center">
              <Icon as={CgProfile} />
              <Link to="/profile">{user?.email}</Link>
            </Flex>
          )
        }
        myEvents={
          pathname.includes("org") ? (
            <Link to="/homeorg">Mis eventos</Link>
          ) : (
            <Link to="/home">Mis eventos</Link>
          )
        }
      />
    </HeaderStyled>
  );
};
