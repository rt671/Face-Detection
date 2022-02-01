import React from "react";
import './Image.css';

const Image = ({imageUrl, boxArray}) => {

    // console.log("The calculations obtained for creating the box is ", box);
    console.log("BoxArray is ",boxArray);

    let finalBoxes = [];
    if(boxArray){
        finalBoxes = boxArray.map(box => {
            return(<div className="bounding_box" style={{top:box.topRow, bottom:box.bottomRow, left:box.leftCol, right:box.rightCol}}></div>);
    });
}
    
        return(
            <div className="center">
                <div className="absolute">
                    <img id="inputImage" src={imageUrl} alt="" height="auto" width="500px"/>
                    {finalBoxes}
                </div>
            </div>
        );
}

export default Image;