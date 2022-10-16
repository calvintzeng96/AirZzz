import React, { useState, useEffect } from "react";
import { createSpot } from "../../store/Spot/SpotFetch";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const CreateSpot = () => {
    const dispatch = useDispatch();
    // const spot = useSelector(state => {
    //     return state.spot
    // })
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
    const history = useHistory()



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

    // useEffect(() => {
    //     const errors = []
    //     if (!address.length) errors.push("address error")
    //     if (!city.length) errors.push("city error")
    //     if (!state.length) errors.push("state error")
    //     if (!country.length) errors.push("country error")
    //     if (!lat || parseInt(lat) || lat > 90 || lat < -90) errors.push("lat error")
    //     if (!lng || parseInt(lng) || lat > 180 || lat < -180) errors.push("lng error")
    //     if (!name.length || name.length > 50) errors.push("name error")
    //     if (!description.length) errors.push("description error")
    //     if (!price || parseInt(price) || parseInt(price) < 0) errors.push("price error")
    // })

    const submit = (e) => {
        e.preventDefault();
        const data = { address, city, state, country, lat, lng, name, description, price }
        if (!errors.length) {
            let done = dispatch(createSpot(data))
            if (done) {
                history.push("/profile")
                alert("New Spot Created")
            }
        } else {
            alert("error")
        }
    };



    return (
        <form onSubmit={submit}>

            <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
            <div id="create-form">
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
                <button onClick={() => reset()}>Reset</button>
                <button type="submit">Sign Up</button>
            </div>
        </form>
    )
}

export default CreateSpot
