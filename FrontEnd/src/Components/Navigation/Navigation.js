import React from "react";

const Navigation = ({onSignOut}) => {
    //  console.log("Route is ", display);
    return(
        <nav>
            <button onClick={() => onSignOut('signin')} className="pa2 ma5">Sign Out</button>
        </nav>
    );

}
export default Navigation;