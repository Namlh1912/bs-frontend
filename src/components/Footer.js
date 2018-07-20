import React from 'react';
import {Link} from 'react-router-dom';

const Footer = () => {
  return (
    <div className="page-footer">
        <div className="container footer-row">
          <div className="col-md-12">
            <div className="flex-center">
              <Link to="#"><i className="fa fa-facebook"></i></Link>
              <Link to="#"><i className="fa fa-twitter"></i></Link>
              <Link to="#"><i className="fa fa-google-plus"></i></Link>
              <Link to="#"><i className="fa fa-instagram"></i></Link>
              <Link to="#"><i className="fa fa-pinterest"></i></Link>
            </div>
          </div>
        </div>
      <div className="copy-right">
        <div className="container-fluid">
          © 2018 Copyright:<Link to="#"> SShop.com</Link>
        </div>
      </div>
    </div>
  )
}

export default Footer;