import CurrentSpot from "../CurrentSpots"
import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { getMySpots } from "../../store/Spot/SpotFetch";
// import { Redirect } from "react-router-dom";
import MyReviews from "../MyReviews";

const Profile = () => {
    const sessionUser = useSelector(state => state.session.user);
    const { firstName, lastName } = sessionUser
    // const dispatch = useDispatch()
    // const spots = useSelector(state => state.spot.allSpots)

    return (
        <>
            <h1 className="top-margin">{`Hello ${firstName} ${lastName}`}</h1>
            <CurrentSpot />

            <MyReviews />
        </>
    )
}

export default Profile
