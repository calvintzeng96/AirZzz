import "./index.css"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useHistory } from "react-router-dom";
import { getUsersBookings } from "../../store/booking";


const Trip = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const bookings = useSelector(state => state.booking.myBookings)
    const bookingsArr = Object.values(bookings)

    useEffect(() => {
        dispatch(getUsersBookings())
            .then(() => {
            })
            .catch(() => {
                alert("failed")
            })
    }, [])



    return (
        <div id="trip-container">
            <div id="trip-title">My Trips</div>
            {bookingsArr.length > 0 && (
                <div className="trip-content-container">
                    {bookingsArr.map(ele => {
                        return (
                            <div id="trip-individual">
                                <div id="trip-individual-1">
                                    <div id="trip-individual-1-1">
                                        <div id="trip-individual-1-1-1">{ele.Spot.name}</div>
                                        <div id="trip-individual-1-1-2">Entire place hosted by {ele.Spot.ownerId}</div>
                                    </div>
                                    <div id="trip-individual-1-2">
                                        <div id="trip-individual-1-2-1">
                                            <div className="trip-individual-1-2-1-date">{ele.startDate.slice(5, 10)}</div>
                                            <div className="trip-individual-1-2-1-year">{ele.startDate.slice(0, 4)}</div>
                                            <div className="trip-individual-1-2-1-date">{ele.endDate.slice(5, 10)}</div>
                                            <div className="trip-individual-1-2-1-year">{ele.endDate.slice(0, 4)}</div>
                                        </div>
                                        <div id="trip-individual-1-2-2">
                                            <div id="trip-individual-1-2-2-1">{ele.Spot.address}</div>
                                            <div id="trip-individual-1-2-2-2">{ele.Spot.city}, {ele.Spot.state}</div>
                                            <div id="trip-individual-1-2-2-3">{ele.Spot.country}</div>
                                        </div>
                                    </div>
                                </div>
                                <img id="trip-image" src={ele.Spot.previewImage} />
                            </div>
                        )
                    }
                    )}
                </div>
            )}

        </div>
    )
}
export default Trip
