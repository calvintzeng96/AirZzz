import React, { useContext, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { ModalContext } from "../../context/Modal";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { setModalType } = useContext(ModalContext)

  const handleSubmit = (e) => {

    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).then(() => setModalType(null)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
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
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        Username or Email
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Log In</button>

      <button onClick={() => demoLogin()}>Demo Login</button>
    </form>
  );
}

export default LoginForm;
