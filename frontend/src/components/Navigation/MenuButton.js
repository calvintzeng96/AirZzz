import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import "./MenuButton.css"
import { ModalContext } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from "@fortawesome/free-solid-svg-icons";


function MenuButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const sessionUser = useSelector(state => state.session.user);
  const { setModalType } = useContext(ModalContext)
  const history = useHistory()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/")
    alert("Successfully Logged Out")
  };

  const currentSpots = (e) => {
    e.preventDefault()
    history.push("/spots/current")
  }

  const profilePage = (e) => {
    e.preventDefault()
    history.push("/profile")
  }

  const goToTrips = () => {
    history.push("/trips")
  }

  if (sessionUser) {
    return (
      <>
        <button className="menu-button" onClick={() => openMenu()}>
          <FontAwesomeIcon className="fas fa-bar" icon={faBars} />
          <i className="fas fa-user-circle" />
        </button>
        {showMenu && (
          <div className="dropdown-container">
            <div id="hi-name" className="dropdown-content">Hello, {user.firstName}</div>
            <button className="dropdown-content" onClick={profilePage}>Profile</button>
            <button onClick={goToTrips}>Trips</button>
            <button className="dropdown-content" onClick={logout}>Log Out</button>
          </div>
        )}
      </>
    );
  } else {
    return (
      <>
        <button className="menu-button" onClick={openMenu}>
          <i className="fas fa-user-circle" />
        </button>
        {showMenu && (
          <div className="dropdown-container">
            <button className="dropdown-content" onClick={() => {
              setModalType("Login")
            }}>Log In</button>
            <button className="dropdown-content" onClick={() => {
              setModalType("Signup")
            }}>Sign Up</button>
          </div>
        )}
      </>
    );
  }
}

export default MenuButton;
