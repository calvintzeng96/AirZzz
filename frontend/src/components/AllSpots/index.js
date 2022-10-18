import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { getAllSpots } from "../../store/Spot/SpotFetch"

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
        history.push(`/spots/${spotId}`)
    }

    return (
        <div id="all-spots-container">
            {
                spotsArray.map(ele =>
                (<div className="card-box" key={ele.id} onClick={() => redirectSingleSpot(ele.id)}>
                    <img src="https://www.gstatic.com/webp/gallery/1.jpg" className="preview-image" />
                    <div>
                    <div>{ele.avgRating} STARS</div>
                    <div className="bold">{ele.city}, {ele.state}</div>
                    <div className="grey">{ele.description}</div>

                    <div><span className="bold">${ele.price}</span> /night</div>
                    </div>
                </div>)
                )
            }
        </div>
    )
}


export default AllSpots
