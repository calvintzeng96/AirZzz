import React, { useState, useContext, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { ModalContext } from "../../context/Modal";
import { updateSpot } from "../../store/Spot/SpotFetch";
import { useSelector } from "react-redux";
import { processError } from "../../store/Error/ErrorReducer";
import { clearErrorStore } from "../../store/Error/ErrorReducer";

function EditForm() {
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
    const [errors, setErrors] = useState([]);
    const { setModalType } = useContext(ModalContext)
    const spot = useSelector(state => state.spot.singleSpot)
    const errorStore = useSelector(state => state.error.errors)

    useEffect(() => {
        setAddress(spot.address)
        setCity(spot.city)
        setState(spot.state)
        setCountry(spot.country)
        setLat(spot.lat)
        setLng(spot.lng)
        setName(spot.name)
        setDescription(spot.description)
        setPrice(spot.price)
    }, [])

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
        return dispatch(updateSpot(spot.id, data))
            .then(() => {
                alert("Edited")
                setModalType(null)
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
                <div className="modal-content-2 modal-header">Edit This Place</div>
                {errors.length > 0 && (
    errors.map(ele => <div className="error-list">{ele}</div>)
)}
                <input className="create-form-elements modal-content-2"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    placeholder="Address"
                />

                <input className="create-form-elements modal-content-2"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    placeholder="City"
                />

                <input className="create-form-elements modal-content-2"
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                    placeholder="State"
                />

                <input className="create-form-elements modal-content-2"
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    placeholder="Country"
                />

                <input className="create-form-elements modal-content-2"
                    type="lat"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    required
                    placeholder="Latitude"
                />

                <input className="create-form-elements modal-content-2"
                    type="long"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    required
                    placeholder="Longitude"
                />

                <input className="create-form-elements modal-content-2"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Name"
                />

                <input className="create-form-elements modal-content-2"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    placeholder="Description"
                />

                <input className="create-form-elements modal-content-2"
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    placeholder="Price"
                />
                <button className="modal-content-2 button-style" type="reset" onClick={() => reset()}>Reset</button>
                <button className="modal-content-2 button-style" type="submit">Submit</button>
                {/* </div> */}
            </form>
    );
}

export default EditForm;



// {
    //     "address": "123 Disney Lane",
    //     "city": "San Francisco",
    //     "state": "California",
    //     "country": "United States of America",
//     "lat": 37.7645358,
//     "lng": -122.4730327,
//     "name": "App Academy",
//     "description": "Place where web developers are created",
//     "price": 123
//   }
