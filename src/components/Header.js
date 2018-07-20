import React from 'react';
import { Link } from 'react-router-dom';

const Header = () =>{
  return(
    <div className="header">
      <Link to="/home">
        <div className="logo"></div>
      </Link>
    </div>
  )
}

export default Header;
