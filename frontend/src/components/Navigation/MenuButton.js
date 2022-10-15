import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import "./MenuButton.css"
import { ModalContext } from "../../context/Modal";

function MenuButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const sessionUser = useSelector(state => state.session.user);
  const { setModalType } = useContext(ModalContext)

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
  };


  if (sessionUser) {
    return (
      <>
        <button className="dropdown-button" onClick={openMenu}>
          <i className="fas fa-user-circle" />
        </button>
        {showMenu && (
          <div className="dropdown-container">
            <div className="dropdown-content">{user.firstName}</div>
            <div className="dropdown-content">sample line</div>
            <button className="dropdown-content" onClick={logout}>Log Out</button>
          </div>
        )}
      </>
    );
  } else {
    return (
      <>
        <button className="dropdown-button" onClick={openMenu}>
          <i className="fas fa-user-circle" />
        </button>
        {showMenu && (
          <div className="dropdown-container">
            <button onClick={() => {
              setModalType("Login")
            }}>Log In</button>
            <button onClick={() => {
              setModalType("Signup")
            }}>Sign Up</button>
          </div>
        )}
      </>
    );
  }
}

export default MenuButton;