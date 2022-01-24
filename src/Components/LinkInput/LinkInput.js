import React from "react";

const LinkInput = ({onInputChange, onButtonClick}) => {

    return(
        <div className="pa3">
            <p className="pa1 f4 w-70 center">This webapp detects faces in your pictures. Give it a try and see the magic!</p>
            <input className="pa1 w-40" type="text" placeholder="Enter the url of the image" onChange={onInputChange}></input>
            <button className="pa1 w-10 ma3 grow dib white bg-light-purple" onClick={onButtonClick}>Detect</button>
        </div>
    );
}

export default LinkInput;