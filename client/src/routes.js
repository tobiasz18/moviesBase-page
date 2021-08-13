import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import GoogleFontLoader from 'react-google-font-loader';
import Home from "./components/home";
import Header from "./components/navigation/header";
import MainLayout from "./hoc/mainLayout";
import Auth from "./components/auth";

const Routes = () => {
  return (
    <Router>
      <Header />
      <MainLayout>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/auth">
            <Auth />
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