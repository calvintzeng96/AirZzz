import React, { useContext, useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { ModalContext } from "../../context/Modal";
import { processError } from "../../store/Error/ErrorReducer";
import { clearErrorStore } from "../../store/Error/ErrorReducer";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { setModalType } = useContext(ModalContext)
  const errorStore = useSelector(state => state.error.errors)

  //ERROR HANDLING POPUP
  useEffect(() => {
    if (Object.keys(errorStore).length) {
      let errMsg = ""
      if (errorStore.statusCode === 400) {
        for (let i = 0; i < errorStore.errors.length; i++) {
          errMsg += errorStore.errors[i] + "\n"
        }
      } else {
        errMsg = errorStore.message
      }
      alert(errMsg)
      dispatch(clearErrorStore())
    }
  }, [errorStore])

  const handleSubmit = (e) => {

    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).then(() => setModalType(null)).catch(
      async (res) => {
        const data = await res.json();
        console.log(data)
        if (data) {
          dispatch(processError(data))
        }
      }
    );
  };

  const demoLogin = (e) => {
    // e.preventDefault()
    setCredential("username1")
    setPassword("password1")
    return dispatch(sessionActions.login({ credential, password })).then(() => setModalType(null))
  }



  return (
    <form className="modal-content" onSubmit={handleSubmit}>
      {/* <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul> */}
      <input className="modal-content-2"
        type="text"
        value={credential}
        onChange={(e) => setCredential(e.target.value)}
        // required
        placeholder="Username or Email"
      />

      <input className="modal-content-2"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        // required
        placeholder="Password"
      />
      <button className="modal-content-2" type="submit">Log In</button>

      <button className="modal-content-2" onClick={() => demoLogin()}>Demo Login</button>
    </form>
  );
}

export default LoginForm;
