import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import LoginFormPage from "./components/LoginFormPage";
// import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

//COMPONENTS HERE
import Profile from "./components/Profile";
import AllSpots from "./components/AllSpots";
import SingleSpot from "./components/SingleSpot"
// import CurrentSpots from "./components/CurrentSpots"
import CreateSpot from "./components/CreateSpot";
import Trip from "./components/Trips"
//------------------------------

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
        <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
            <Route exact path="/">
              <AllSpots />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/trips">
              <Trip />
            </Route>
            <Route exact path="/spots">
              <CreateSpot />
            </Route>
            {/* <Route exact path="/spots/current">
              <CurrentSpots />
            </Route> */}
            <Route path="/spots/:spotId">
              <SingleSpot />
            </Route>

          </Switch>
        )}
        {/* <div id="footer">Footer Holder</div> */}
    </>
  );
}

export default App;
