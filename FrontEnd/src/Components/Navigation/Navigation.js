import React from "react";

const Navigation = ({onSignOut, display}) => {
    //  console.log("Route is ", display);
    return(
        <nav>
            <button onClick={() => onSignOut('signin')} className="pa2 ma5">{display}</button>
        </nav>
    );

}
export default Navigation;