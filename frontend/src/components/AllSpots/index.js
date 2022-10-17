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
                    <div className="preview-image">PREVIEW IMAGE</div>
                    <div>{ele.city}, {ele.state}</div>
                    <div>{ele.country}</div>
                    <div>Name: {ele.name}</div>
                    <div>${ele.price} /night</div>
                </div>)
                )
            }
        </div>
    )
}


export default AllSpots
