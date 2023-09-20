import { Button, Flex, Icon } from "@chakra-ui/react";
import { InputHeader } from "../Inputs/Input";
import { MobileMenu } from "../Menu/MobileMenu";
import useWidth from "../../hooks/useWidth";
import { DesktopMenu } from "../Menu/DesktopMenu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useOrgAuth } from "../../context/authOrgContext";
import { useAuth } from "../../context/authContext";
import "./Header.css";
import { HeaderStyled } from "./Header.element";
import { useState } from "react";

export const Header = () => {
  const [isOrg, setIsOrg] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const navigate = useNavigate();
  const { organization, logoutOrg } = useOrgAuth();
  const { user, logout } = useAuth();
  const { width } = useWidth();
  const { pathname } = useLocation();
  const Menu = width < 1000 ? MobileMenu : DesktopMenu;
  return (
    <HeaderStyled>
      <Flex align="center" gap="2em" w="40vw">
        <Button
          w="10"
          onClick={() => (organization ? navigate("/org") : navigate("/"))}
        >
          <img
            src="https://res.cloudinary.com/dhr13yihn/image/upload/v1694439036/proyectoEventland/assets/OIG_gsdzjv.jpg"
            alt="Eventland logo"
            className="logo"
          />
        </Button>
        <div>
          <InputHeader />
        </div>
      </Flex>
      <Menu
        switchMode={
          pathname.includes("org") ? (
            <Button
              background="transparent"
              transition="0.3s"
              onClick={() => {
                setIsUser(() => true);
                organization ? logoutOrg(isUser, setIsUser) : navigate("/");
              }}
            >
              Eventland para usuarios
            </Button>
          ) : (
            <Button
              background="transparent"
              transition="0.3s"
              onClick={() => {
                setIsOrg(() => true);
                user ? logout(isOrg, setIsOrg) : navigate("/org");
              }}
            >
              Crea tus propios eventos
            </Button>
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
