import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import GoogleFontLoader from 'react-google-font-loader';
import Home from "./components/home";

const Routes = () => {
  return (
    <Router>

      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>

      <GoogleFontLoader
        fonts={[
          {
            font: 'Roboto',
            weights: [300, 400, 900],
          },
          {
            font: 'Fredoka One',
            weights: [400, 700],
          },
        ]}
        subsets={['cyrillic-ext', 'greek']}
      />
    </Router >
  )
}

export default Routes;