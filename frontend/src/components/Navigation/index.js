import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <div>
        <LoginFormModal />
        <SignupFormModal />
        {/* <NavLink to="/login">Log In</NavLink> */}
        {/* <NavLink to="/signup">Sign Up</NavLink> */}
      </div>
    );
  }

  return (
    <>
      <div id="nav-bar">
        <div>
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
