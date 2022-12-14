import "./index.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
const Booking = () => {
    const spot = useSelector(state => state.spot.singleSpot)
    const [checkin, setCheckin] = useState("")
    const [checkout, setCheckout] = useState("")
    const [totalDays, setTotalDays] = useState(5)
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        let now = new Date()
        let now3 = new Date(now)
        now3.setDate(now3.getDate() + 5)
        let defaultCheckin = now.toISOString().split("T")[0]
        let defaultCheckout = now3.toISOString().split("T")[0]
        setCheckin(defaultCheckin)
        setCheckout(defaultCheckout)
        // console.log("============1", totalDays)
    }, [])

    useEffect(() => {
        let updatedCheckin = new Date(checkin)
        let updatedCheckout = new Date(checkout)
        if (updatedCheckin < updatedCheckout) {
            setTotalDays((updatedCheckout - updatedCheckin) / 8.64e+7)
        } else {
            setTotalDays(0)
        }
    }, [checkin, checkout])
    useEffect(() => {
        setTotalPrice((totalDays * spot.price))

    }, [totalDays])

    const submit = () => {
        return
    }

    const goToSpotReviews = () => {
        let reviewsLocation = document.getElementById("review-section-header")
        reviewsLocation.scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
    }
    return (
        <div id="bookings-container">
            {console.log("==================3", spot)}
            <div id="bookings-1" className="">
                <div id="bookings-1-1">
                    <div id="bookings-1-1-1" className="slight-bold">${spot.price}</div>
                    <div id="bookings-1-1-2">night</div>
                </div>
                <div id="bookings-1-2">
                    {spot.numReviews > 0 && (
                        <>
                            <FontAwesomeIcon icon={faStar} className="fas fa-star bookings-1-2-1" />
                            <div id="bookings-1-2-2">{spot.avgRating}</div>
                            <div id="bookings-1-2-3">??</div>
                        </>
                    )}
                    <div id="bookings-1-2-4" className="cursor" onClick={goToSpotReviews}>{spot.numReviews} reviews</div>
                </div>
            </div>
            <form onSubmit={submit} id="bookings-2" className="">


                <div id="bookings-form-selection-container">
                    <div id="bookings-form-selection-container-1">
                        <div id="bookings-form-selection-container-1-1">
                            <label>CHECK-IN</label>
                            <input
                                type="date"
                                value={checkin}
                                onChange={(e) => setCheckin(e.target.value)}
                            />
                        </div>
                        <div id="bookings-form-selection-container-1-2">
                            <label>CHECKOUT</label>
                            <input
                                type="date"
                                value={checkout}
                                onChange={(e) => setCheckout(e.target.value)}
                            />
                        </div>
                    </div>
                    <div id="bookings-form-selection-container-2">
                        <label>GUESTS</label>
                        <select>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>
                </div>

                <button id="bookings-form-submit-button" className="cursor">Reserve</button>



            </form>
            <div id="bookings-3" className="">
                You won't be charged yet
            </div>
            <div id="bookings-4" className="">
                <div className="bookings-4-content">
                    <div className="bookings-4-content-1">${spot.price} x {totalDays} nights</div>
                    <div>${totalPrice}</div>
                </div>
                <div className="bookings-4-content">
                    <div className="bookings-4-content-1">Cleaning fee</div>
                    <div>$40</div>
                </div>
                <div className="bookings-4-content">
                    <div className="bookings-4-content-1">Service fee</div>
                    <div>$10</div>
                </div>
            </div>
            <div id="bookings-5" className="">
                <div>Total before taxes</div>
                <div>${totalDays > 0 ? totalPrice + 50 : 0}</div>
            </div>
        </div>
    )
}

export default Booking
