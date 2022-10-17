import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { getMySpots } from "../../store/Spot/SpotFetch"
import { Redirect } from "react-router-dom"

const CurrentSpots = () => {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory()
    const spots = useSelector(state => {
        return state.spot.allSpots
    })

    let spotsArray = Object.values(spots)
    const dispatch = useDispatch()

    useEffect(() => {
        // if (!sessionUser) {
        //     alert("test")
        // } else {
            dispatch(getMySpots())
        // }
    }, [])


    const redirectSingleSpot = (spotId) => {
        history.push(`/spots/${spotId}`)
    }

    if (!sessionUser) return <Redirect to="/" />
    return (
        <>
            <h1 className="top-margin">ALL MY SPOTS</h1>
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
        </>
    )
}


export default CurrentSpots
