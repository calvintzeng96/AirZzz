import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import MenuButton from "./MenuButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  let history = useHistory()
  //redirect to creat spot form

  const goToCreateSpotForm = () => {
    history.push("/spots")
  }


  let createSpotButton;
  let sessionLinks;

  if (sessionUser) {
    sessionLinks = (
      <MenuButton user={sessionUser} />
    );
    createSpotButton = (
      <button onClick={() => goToCreateSpotForm()}>Host Your Place</button>)
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
        <div id="create-and-menu-container">
          <div>
            {isLoaded && createSpotButton}
          </div>
          <div id="login-signup">
            {isLoaded && sessionLinks}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navigation;
