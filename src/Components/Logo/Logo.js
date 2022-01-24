import React from "react";
import logo from "./logo.png"
// import Tilt from 'react-parallax-tilt';

const Logo = () => {

    return(
        <div className="ma4" style={{ display:"inline-block", height: '150px', width:'150px'}}>
          <img src={logo} alt="logo"/>
        </div>
    );
}

export default Logo;