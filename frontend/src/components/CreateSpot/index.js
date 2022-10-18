import React, { useState } from "react";
import { createSpot } from "../../store/Spot/SpotFetch";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

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




    const submit = (e) => {
        e.preventDefault();
        const data = { address, city, state, country, lat, lng, name, description, price }
        let error = []
        //front end err check
        if (address.length === 0) error.push("address required")
        if (city.length === 0) error.push("city required")
        if (state.length === 0) error.push("state required")
        if (country.length === 0) error.push("country required")
        if (lat.length === 0) error.push("lat required")
        if (lat > 90 || lat < -90) error.push("latitude is not valid")
        if (lng.length === 0) error.push("lng required")
        if (lng > 180 || lng < -180) error.push("longitude is not valid")
        if (name.length === 0) error.push("name required")
        if (name.length > 50) error.push("name needs to be 50 characters or less")
        if (description.length === 0) error.push("description required")
        if (price.length === 0) error.push("price required")
        //--------------

//SOMEHOW ERROR ARRAY IS NOT GET UPDATED IN TIME FOR THE "IF !ERRORS.LENGTH" CHECK......
//NEED TO FIGURE OUT AND FIX!!!!!!!!!


        if (!error.length) {
            dispatch(createSpot(data))
                .then(() => {
                    history.push("/profile")
                    alert("New Spot Created")
                }).catch(() => {
                    alert("This spot already exists")
                })
        } else {
            let test = ""
            for (let i = 0; i < error.length; i++) {
                test += error[i] + "\n"
            }
            alert(test)
        }
    };


    return (
        <form onSubmit={submit}>

            {/* <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul> */}
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
                    type="number"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    // required
                    placeholder="Latitude"
                />

                <input className="create-form-elements"
                    type="number"
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
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    // required
                    placeholder="Price"
                />
                <button type="reset" onClick={() => reset()}>Reset</button>
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}

export default CreateSpot
