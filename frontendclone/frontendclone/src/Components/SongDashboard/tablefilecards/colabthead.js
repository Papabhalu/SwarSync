import React from "react";

let email=localStorage.getItem('userEmail')
console.log(email);

function colabthead() {
    return (
        <tr>
        <th scope="col">Date</th>
        <th scope="col">Owner</th>
        <th scope="col">Description</th>
        <th scope="col">Size</th>
        <th scope="col"></th>
    </tr>
    );
}

export default colabthead;