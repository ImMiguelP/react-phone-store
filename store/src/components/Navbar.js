import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import styled from "styled-components";
import { ButtonContainer } from "./Button";

const Navbar = () => {
  return (
    <NavWrapper className="navbar navbar-expand-small navbar-dark px-sm-5">
      <Link to="/">
        <img
          src={logo}
          width="30"
          height="50"
          alt="store"
          className="navbar-brand"
        />
      </Link>
      <ul className="navbar-nav align-items-center">
        <li className="nav-item ml-5"></li>
        <Link to="/" className="nav-link">
          Products
        </Link>
      </ul>
      <Link to="/cart" className="ml-auto">
        <ButtonContainer>
          <span className="mr-2">
            <i className="fas fa-cart-plus" />
          </span>
          My Cart
        </ButtonContainer>
      </Link>
    </NavWrapper>
  );
};

export default Navbar;

const NavWrapper = styled.nav`
  background: var(--mainBlue);
  .nav-link {
    color: var(--mainWhite) !important;
    font-size: 1.3rem;
    text-transform: capitalize;
  }
`;
