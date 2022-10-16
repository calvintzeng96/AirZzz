import CurrentSpot from "../CurrentSpots"
import { useSelector } from "react-redux";

const Profile = () => {
    const sessionUser = useSelector(state => state.session.user);
    const {firstName, lastName} = sessionUser
    return (
        <>
            <h1 className="top-margin">{`Hello ${firstName} ${lastName}` }</h1>
            <div>Manage Reviews</div>
            <div className="top-margin">REVIEWS PLACEHOLDER</div>
            <div>Manage Spots</div>
            <CurrentSpot />
        </>
    )
}

export default Profile
