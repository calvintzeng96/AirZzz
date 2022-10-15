import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import MenuButton from "./MenuButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <MenuButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <div>
        <MenuButton />
      </div>
    );
  }

  return (
    <>
      <div id="nav-bar">
        <div id="home">
          <NavLink exact to="/">Home</NavLink>
        </div>
        <div id="login-signup">
          {isLoaded && sessionLinks}
        </div>
      </div>
    </>
  );
}

export default Navigation;
