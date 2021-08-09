import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import GoogleFontLoader from 'react-google-font-loader';
import Home from "./components/home";
import Navbar from "./components/navigation/Navbar";

import Container from "@material-ui/core/Container";
import MainLayout from "./hoc/mainLayout";

const Routes = () => {
  return (
    <Router>
      <Navbar />
      <MainLayout>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </MainLayout>

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

export default Routes