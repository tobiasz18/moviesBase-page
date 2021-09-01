import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { isAuthUser } from "./store/actions/users_actions";
import { Loader } from "./utils/loader";
import Dashboard from "./components/dashboard/index";
import Profile from "./components/dashboard/profile";
import Articles from "./components/dashboard/articles";
import authguard from "./hoc/authGuard";
import Article from "./components/articles/article";


const Routes = () => {
  const [loading, setLoading] = useState(true)
  const state = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(isAuthUser())
  }, [dispatch])

  useEffect(() => {
    if (state.auth !== null) {
      setLoading(false)
    }
  }, [state.auth])

  return (
    <Router>
      <Header />
      {loading ? <Loader /> :
        <MainLayout>
          <Switch>
            <Route path="/article/:id" component={Article} />
            <Route path="/dashboard/articles" component={authguard(Articles, true)} />
            <Route path="/dashboard/profile" component={authguard(Profile)} />
            <Route path="/dashboard" component={authguard(Dashboard)} />
            <Route path="/auth" component={Auth} />
            <Route path="/" component={Home} />
          </Switch>
        </MainLayout>
      }
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