import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { getAllSpots } from "../../store/Spot/SpotFetch"
// import { getSingleSpot } from "../../store/Spot/SpotFetch"
import "./index.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from "@fortawesome/free-solid-svg-icons";

const AllSpots = () => {
    const history = useHistory()
    const spots = useSelector(state => {
        return state.spot.allSpots
    })
    let spotsArray = Object.values(spots)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllSpots())
    }, [])

    const redirectSingleSpot = (spotId) => {
        // dispatch(getSingleSpot(spotId))
        history.push(`/spots/${spotId}`)
    }

    const starsValue = (stars) => {
        return stars === null ? false : true
    }

    return (
        <div id="all-spots-container">
            {
                spotsArray.map(ele =>
                (<div className="card-box" key={ele.id} onClick={() => redirectSingleSpot(ele.id)}>
                    <img src={ele.previewImage} className="preview-image" />
                    <div id="card-bottom">

                        <div id="spot-stars-card">
                            {starsValue(ele.avgRating) && (
                                <div className="star-rating">
                                    <FontAwesomeIcon icon={faStar} className="fas fa-star" />
                                    <div>

                                        {ele.avgRating}
                                    </div>
                                </div>
                            )}
                            {!starsValue(ele.avgRating) && (
                                <div className="star-rating">
                                    <FontAwesomeIcon icon={faStar} className="fas fa-star" />
                                    <div>
                                        New
                                    </div>
                                </div>
                            )}
                        </div>
                        <div id="country">{ele.country}</div>
                        <div id="city-state" className="slight-bold">{ele.city}, {ele.state}</div>
                        <div id="description-card" className="grey">{ele.description}</div>

                        <div id="spot-price"><span className="bold">${ele.price}</span> /night</div>

                    </div>
                </div>)
                )
            }
        </div>
    )
}


export default AllSpots
