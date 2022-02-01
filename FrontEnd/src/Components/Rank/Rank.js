import React from "react";

const Rank = ({name, entries}) => {
    return(
        <div>{`${name}, your current rank is #${entries}`}</div>
    );
}

export default Rank;