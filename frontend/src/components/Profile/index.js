import CurrentSpot from "../CurrentSpots"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getMySpots } from "../../store/Spot/SpotFetch";
import { Redirect } from "react-router-dom";

const Profile = () => {
    const sessionUser = useSelector(state => state.session.user);
    const { firstName, lastName } = sessionUser
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMySpots())
    }, [])

    return (
        <>
            <h1 className="top-margin">{`Hello ${firstName} ${lastName}`}</h1>
            <div>Manage Reviews</div>
            <div className="top-margin">REVIEWS PLACEHOLDER</div>
            <div>Manage Spots</div>
            <CurrentSpot />
        </>
    )
}

export default Profile
