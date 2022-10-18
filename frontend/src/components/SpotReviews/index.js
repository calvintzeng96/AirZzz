import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSpotReviews } from "../../store/Review/ReviewFetch"

const SpotReviews = (props) => {
    // const sessionUser = useSelector(state => state.session.User)
    const { spotId } = props
    const dispatch = useDispatch()
    const reviews = useSelector(state => state.review.reviews)
    const reviewsArr = Object.values(reviews)

    useEffect(() => {
        dispatch(getSpotReviews(spotId))
    }, [])


    return (
        <div>
            <h1>Reviews</h1>
            <ul>
                {
                    reviewsArr.map(ele => {
                        return (

                            <li key={ele.id}>
                                {ele.User && (
                                    <div>{ele.User.firstName}</div>

                                )}
                                <div>Review: {ele.review}</div>
                                <div>Stars: {ele.stars}</div>
                            </li>
                        )
                    })
                }
            </ul>
            <h1>REVIEWS PLACEHOLDER</h1>
        </div>
    )
}

export default SpotReviews
