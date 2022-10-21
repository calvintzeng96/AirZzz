import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import MenuButton from "./MenuButton";
import "./Navigation.css";
import logo from "../../assets/home-logo.png"
import { ModalContext } from "../../context/Modal";
import { useContext } from "react";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const { setModalType } = useContext(ModalContext)

  // let history = useHistory()
  //redirect to creat spot form

  // const goToCreateSpotForm = () => {
  //   history.push("/spots")
  // }


  let createSpotButton;
  let sessionLinks;

  if (sessionUser) {
    sessionLinks = (
      <MenuButton user={sessionUser} />
    );
    createSpotButton = (
      <button id="host-spot" onClick={() => {
        setModalType("CreateSpot")
      }}>Host Your Place</button>)
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
          <NavLink exact to="/">
            <img id="home-logo" src={logo} />
          </NavLink>
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
