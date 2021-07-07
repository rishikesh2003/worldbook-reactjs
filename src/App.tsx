import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import CountryDetails from "./Pages/CountryDetails";
const App : React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path={"/"} exact component={Home} />
        <Route path={"/country-details/:name"} component={CountryDetails} />
      </Switch>
    </Router>
  );
};

export default App;
