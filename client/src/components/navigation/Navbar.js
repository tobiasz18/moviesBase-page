import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Navigation from './navigation';

const Navbar = () => {
  return (
    <nav className="navbar fixed-top" >
      <Link style={{ fontFamily: "Fredoka One" }} to="/"
        className="navbar-brand d-flex align-items-center">
        FilmsBase
      </Link>
      <Navigation />
    </nav>
  )
}

export default withRouter(Navbar)