import React, { useState, useEffect, useContext } from "react";
import { addImage, createSpot } from "../../store/Spot/SpotFetch";
import { useDispatch } from "react-redux";
import { processError } from "../../store/Error/ErrorReducer"
import { useSelector } from "react-redux";
import { clearErrorStore } from "../../store/Error/ErrorReducer";
import { ModalContext } from "../../context/Modal";
import "./index.css"
import { Redirect } from "react-router-dom";


const CreateSpot = () => {
    const dispatch = useDispatch();
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("")
    const errorStore = useSelector(state => state.error.errors)
    const [errors, setErrors] = useState([])
    const {setModalType} = useContext(ModalContext)


    const reset = () => {
        setAddress("")
        setCity("")
        setState("")
        setCountry("")
        setLat("")
        setLng("")
        setName("")
        setDescription("")
        setPrice("")
        setImage("")
    }

    useEffect(() => {
        if (Object.keys(errorStore).length) {
            let err = []
            if (errorStore.statusCode === 400) {
                for (let i = 0; i < errorStore.errors.length; i++) {
                    err.push(errorStore.errors[i])
                }
            } else {
                err.push(errorStore.message)
            }
            // alert(err)
            setErrors(err)
            dispatch(clearErrorStore())
        }
    }, [errorStore])


    const submit = (e) => {
        e.preventDefault();
        const data = { address, city, state, country, lat, lng, name, description, price }
        const imageData = {
            url: image,
            preview: true
        }

        dispatch(createSpot(data))
        .then((res) => {
            dispatch(addImage(imageData, res.id)).then(() => {
                alert("New Spot Created")
                setModalType(null)
                window.location.reload()
            })
        })
        .catch(async (res) => {
            const data = await res.json();
            if (data) {
                dispatch(processError(data))
            }
        })
    };


    return (
        <form className="modal-content" onSubmit={submit}>
            <div className="modal-content-2 modal-header">Host Your Home Here</div>
                {errors.length > 0 && (
                    errors.map(ele => <div className="error-list">{ele}</div>)
                )}

                <input className="modal-content-2"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    placeholder="Address"
                />

                <input className="modal-content-2"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    placeholder="City"
                />

                <input className="modal-content-2"
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                    placeholder="State"
                />

                <input className="modal-content-2"
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    placeholder="Country"
                />

                <input className="modal-content-2"
                    type="number"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    required
                    placeholder="Latitude"
                />

                <input className="modal-content-2"
                    type="number"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    required
                    placeholder="Longitude"
                />

                <input className="modal-content-2"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Name"
                />

                <input className="modal-content-2"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    placeholder="Description"
                />

                <input className="modal-content-2"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    placeholder="Price"
                />

                <input className="modal-content-2"
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    required
                    placeholder="Main Image URL"
                />
                <button className="modal-content-2 button-style" type="reset" onClick={() => reset()}>Reset</button>
                <button className="modal-content-2 button-style" type="submit">Submit</button>
        </form>
    )
}

export default CreateSpot
