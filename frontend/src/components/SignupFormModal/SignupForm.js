import React, { useState, useContext, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { ModalContext } from "../../context/Modal";
import { processError } from "../../store/Error/ErrorReducer";
import { clearErrorStore } from "../../store/Error/ErrorReducer";

function SignupForm() {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const { setModalType } = useContext(ModalContext)
    const errorStore = useSelector(state => state.error.errors)

    useEffect(() => {
        //using hashmap to make sure no repeat error msg
        //terrible backend design
        if (Object.keys(errorStore).length) {
            let err = []
            if (errorStore.statusCode === 400) {
                let set = new Set()
                for (let i = 0; i < errorStore.errors.length; i++) {
                    if (set.has(errorStore.errors[i])) continue
                    set.add(errorStore.errors[i])
                    err.push(errorStore.errors[i])
                }
            } else {
                err.push(errorStore.message)
            }
            setErrors(err)
            dispatch(clearErrorStore())
        }
    }, [errorStore])


    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ firstName, lastName, email, username, password }))
                .then(() => {
                    setModalType(null)
                    alert("Successfully signed up. You are now currently Logged In")
                })
                .catch(async (res) => {
                    const data = await res.json();
                    if (data) {
                        dispatch(processError(data))
                    }
                });
        } else {
            setErrors(["Passwords do not match"])
        }
    };

    return (
        <form className="modal-content" onSubmit={handleSubmit}>
            <div className="modal-content-2 modal-header">SIGN UP</div>
            {errors.length > 0 && (
                errors.map(ele => <div className="error-list">{ele}</div>)
            )}
            <input className="modal-content-2"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Username"

            />
            <input className="modal-content-2"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                placeholder="First Name"
            />
            <input className="modal-content-2"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                placeholder="Last Name"
            />
            <input className="modal-content-2"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
            />
            <input className="modal-content-2"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
            />
            <input className="modal-content-2"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm Password"

            />
            <button className="modal-content-2 button-style" type="submit">Sign Up</button>
        </form>
    );
}

export default SignupForm;
