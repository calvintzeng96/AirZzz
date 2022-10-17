import { getSingleSpot } from "../../store/Spot/SpotFetch"
import { useEffect, useState, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { deleteSpot } from "../../store/Spot/SpotFetch"
import { useHistory } from "react-router-dom"
import { ModalContext } from "../../context/Modal"

const SingleSpot = () => {
    const sessionUser = useSelector(state => state.session.user);
    const { spotId } = useParams()
    const spot = useSelector(state => state.spot.singleSpot)
    const dispatch = useDispatch()
    const history = useHistory()
    const { setModalType } = useContext(ModalContext)

    useEffect(() => {
        dispatch(getSingleSpot(spotId))
    }, [spotId])

    if (!spot) return null

    const deleteSpotButton = () => {
        dispatch(deleteSpot(spot.id))
        history.push("/profile")
    }


    return (
        <>
            <div id="single-spot-container">
                {sessionUser.id === spot.ownerId && (
                    <>
                        <button onClick={() => setModalType("Edit")}>Edit</button>
                        <button onClick={deleteSpotButton}>Delete</button>
                    </>
                )}
                <div>id: {spot.id}</div>
                <div>address: {spot.address}</div>
                <div>city: {spot.city}</div>
                <div>state: {spot.state}</div>
                <div>country: {spot.country}</div>
                <div>name: {spot.name}</div>
                <div>description: {spot.description}</div>
                <div>avgRating: {spot.avgRating}</div>
            </div>
        </>
    )
}

export default SingleSpot
