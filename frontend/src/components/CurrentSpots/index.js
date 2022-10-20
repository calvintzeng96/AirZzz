import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { getMySpots } from "../../store/Spot/SpotFetch"
import { Redirect } from "react-router-dom"

const CurrentSpots = () => {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory()
    const spots = useSelector(state => state.spot.allSpots)

    let spotsArray = Object.values(spots)
    console.log(spotsArray)
    console.log(spotsArray[0].previewImage)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log("USE EFFECT RAN")
        dispatch(getMySpots())
    }, [])


    const redirectSingleSpot = (spotId) => {
        history.push(`/spots/${spotId}`)
    }

    const starsValue = (stars) => {
        return stars === null ? false : true
    }

    if (!sessionUser) return <Redirect to="/" />
    if (!spotsArray.length) {
        return (
            <>
                <h1 className="top-margin">MY SPOTS</h1>
                <div className="center margin-bottom">You currently have no spots</div>
            </>
        )
    } else {
        return (
            <>
                <h1 className="top-margin">MY SPOTS</h1>
                <div id="all-spots-container">
                    {
                        spotsArray.map(ele =>
                        (<div className="card-box" key={ele.id} onClick={() => redirectSingleSpot(ele.id)}>
                            <img src={ele.previewImage} className="preview-image" />

                            <div id="card-bottom">

                                <div id="spot-stars-card">
                                    {starsValue(ele.avgRating) && (
                                        <div>⭐ {ele.avgRating}</div>
                                    )}
                                    {!starsValue(ele.avgRating) && (
                                        <div>⭐ New</div>
                                    )}
                                </div>
                                <div id="country">{ele.country}</div>
                                <div id="city-state" className="bold">{ele.city}, {ele.state}</div>
                                <div id="description-card" className="grey">{ele.description}</div>

                                <div id="spot-price"><span className="bold">${ele.price}</span> /night</div>

                            </div>
                        </div>)
                        )
                    }
                </div>
            </>
        )
    }
}


export default CurrentSpots
