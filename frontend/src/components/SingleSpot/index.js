import { getSingleSpot } from "../../store/Spot/SpotFetch"
import { useEffect, useState, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { deleteSpot } from "../../store/Spot/SpotFetch"
import { useHistory } from "react-router-dom"
import { ModalContext } from "../../context/Modal"
import { Redirect } from "react-router-dom"
import SpotReviews from "../SpotReviews"
import "./index.css"
import Booking from "../Booking"


const SingleSpot = () => {
    const sessionUser = useSelector(state => state.session.user);
    const { spotId } = useParams()
    const spot = useSelector(state => state.spot.singleSpot)
    const dispatch = useDispatch()
    const history = useHistory()
    const { setModalType } = useContext(ModalContext)
    // const reviews = useSelector(state => state.review.userReviews)
    let test = spot?.avgRating


    useEffect(() => {
        dispatch(getSingleSpot(spotId))
    }, [spotId, test])

    if (!spot) return null

    const deleteSpotButton = () => {
        if (window.confirm("you sure delete?")) {
            dispatch(deleteSpot(spot.id)).then(() => history.push("/profile"))
        }
    }

    const starsValue = (stars) => {
        return stars === null ? false : true
    }




    return (
        <>
            <div id="single-spot-container">
                <div id="spot-header">
                    <div id="spot-header-upper">
                        <div>name: {spot.name}</div>
                    </div>
                    <div id="spot-header-lower">
                        <div id="spot-header-lower-2">
                            {starsValue(spot.avgRating) && (
                                <div>⭐ {spot.avgRating}</div>
                            )}
                            {!starsValue(spot.avgRating) && (
                                <div>⭐ No Reviews</div>
                            )}
                            <div className="spacer"></div>
                            <div id="location">{`${spot.address}, ${spot.city}, ${spot.state}, ${spot.country}`}</div>
                        </div>
                        <div>
                            <div className="spacer"></div>
                            <div id="edit-delete">
                                {sessionUser && sessionUser.id === spot.ownerId && (
                                    <>
                                        <button className="button" onClick={() => setModalType("Edit")}>Edit</button>
                                        <button className="button" onClick={deleteSpotButton}>Delete</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                </div>


                <div id="images">
                    <img id="main-image" src={spot?.SpotImages?.[0]?.url} />
                    <div id="other-images">
                        <img src="https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg" />
                        <img src="https://images.unsplash.com/photo-1494059980473-813e73ee784b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80" />
                        <img src="https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
                        <img src="https://images.unsplash.com/photo-1618570364947-710d2c120d8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
                    </div>
                </div>

                <div id="info-bookings">
                    <div id="spot-info">
                        <div className="bold h2">Entire place hosted by {spot?.Owner?.firstName}</div>
                        <div className="top-bot-margin grey h4">Free cancellation for 48 hours.</div>
                        <div className="top-bot-margin grey h4">Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</div>

                        <div>description: {spot.description}</div>
                    </div>
                    <div id="bookings">
                        <Booking />
                    </div>
                </div>
                <div id="review-section-header">

                    <h1>Reviews</h1>
                    {sessionUser && spot.ownerId !== sessionUser.id && (
                        <button id="review-button" onClick={() => {
                            setModalType("CreateReview")
                        }}>Leave a Review</button>
                    )}
                </div>
                <br></br>
                <div id="review-container">
                    <SpotReviews spotId={spotId} />
                </div>
                <div className="height">
                    123
                </div>
            </div>
        </>
    )
}

export default SingleSpot
