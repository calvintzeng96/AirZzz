import React, { useState, useContext, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { ModalContext } from "../../context/Modal";
import { updateSpot } from "../../store/Spot/SpotFetch";
import { useSelector } from "react-redux";

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

    const submit = (e) => {
        e.preventDefault();
        const data = { address, city, state, country, lat, lng, name, description, price }
        if (!errors.length) {
            let done = dispatch(updateSpot(spot.id ,data))
            if (done) {
                setModalType(null)
                alert("Spot Updated")
            }
        } else {
            alert("error")
        }
    };

    return (
        <form className="modal-content" onSubmit={submit}>
            <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
            <div>
                <input className="create-form-elements"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    // required
                    placeholder="Address"
                />

                <input className="create-form-elements"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    // required
                    placeholder="City"
                />

                <input className="create-form-elements"
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    // required
                    placeholder="State"
                />

                <input className="create-form-elements"
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    // required
                    placeholder="Country"
                />

                <input className="create-form-elements"
                    type="lat"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    // required
                    placeholder="Latitude"
                />

                <input className="create-form-elements"
                    type="long"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    // required
                    placeholder="Longitude"
                />

                <input className="create-form-elements"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    // required
                    placeholder="Name"
                />

                <input className="create-form-elements"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    // required
                    placeholder="Description"
                />

                <input className="create-form-elements"
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    // required
                    placeholder="Price"
                />
                <button type="reset" onClick={() => reset()}>Reset</button>
                <button type="submit">Submit</button>
            </div>
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
