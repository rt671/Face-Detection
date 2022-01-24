import React from "react";
import './Image.css';

const Image = ({imageUrl, box}) => {

    console.log("The calculations obtained for creating the box is ", box);
    return(
        <div className="center">
            <div className="absolute">
                <img id="inputImage" src={imageUrl} alt="" height="auto" width="500px"/>
                <div className="bounding_box" style={{top:box.topRow, bottom:box.bottomRow, left:box.leftCol, right:box.rightCol}}></div>
            </div>
        </div>
    );
}

export default Image;