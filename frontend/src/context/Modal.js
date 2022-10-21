import React, { useContext, useRef, useState, useEffect } from 'react';
import './Modal.css';
import LoginForm from '../components/LoginFormModal/LoginForm';
import SignupForm from '../components/SignupFormModal/SignupForm';
import EditForm from '../components/EditFormModal/EditForm';
import ReviewForm from "../components/ReviewForm/ReviewForm"
import ReviewEditFormModal from "../components/ReviewEditFormModal/ReviewEditFormModal"
import CreateSpot from '../components/CreateSpot';

export const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();
  const [modalType, setModalType] = useState(null);

  useEffect(() => {
    setValue(modalRef.current);
  }, [])

  return (
    <>
      <ModalContext.Provider value={{ value, modalType, setModalType }}>
        {/* <div id="modal-container"> */}
          {children}
        {/* </div> */}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}


export function SelectedModals() {
  const { modalType, setModalType } = useContext(ModalContext)

  if (modalType === "Login") {
    return (
      <div className="modal">
        <LoginForm />
        <div onClick={() => setModalType(null)} className="modal-background"></div>
      </div>

    )
  }
  if (modalType === "Signup") {
    return (
      <div className="modal">
        <SignupForm />
        <div onClick={() => setModalType(null)} className="modal-background"></div>
      </div>
    )
  }
  if (modalType === "CreateSpot") {
    return (
      <div className="modal">
        <CreateSpot />
        <div onClick={() => setModalType(null)} className="modal-background"></div>
      </div>
    )
  }
  if (modalType === "Edit") {
    return (
      <div className="modal">
        <EditForm />
        <div onClick={() => setModalType(null)} className="modal-background"></div>
      </div>
    )
  }
  if (modalType === "CreateReview") {
    return (
      <div className="modal">
        <ReviewForm />
        <div onClick={() => setModalType(null)} className="modal-background"></div>
      </div>
    )
  }
  if (modalType === "EditReview") {
    return (
      <div className="modal">
        <ReviewEditFormModal />
        <div onClick={() => setModalType(null)} className="modal-background"></div>
      </div>
    )
  }
  return null
}
