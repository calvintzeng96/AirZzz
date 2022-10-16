import { getSingleSpot } from "../../store/Spot/SpotFetch"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

const SingleSpot = () => {
    const { spotId } = useParams()
    const spot = useSelector(state => {
        return state.spot[spotId]
    })
    console.log("**********", spot)

    const dispatch = useDispatch()
    useEffect(() => {
        console.log("USING USEEFFECT")
        dispatch(getSingleSpot(spotId))
    }, [spotId])


    if (spot == undefined) return null
    return (
        <div id="single-spot-container">
            <div>id: {spot.id}</div>
            <div>address: {spot.address}</div>
            <div>city: {spot.city}</div>
            <div>state: {spot.state}</div>
            <div>country: {spot.country}</div>
            <div>name: {spot.name}</div>
            <div>description: {spot.description}</div>
            <div>avgRating: {spot.avgRating}</div>
        </div>
    )
}

export default SingleSpot
