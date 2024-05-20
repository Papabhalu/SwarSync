import React from "react";


let email=localStorage.getItem('userEmail')
console.log(email);
function Ownercolabhead() {
    return (
        <tr>
            <th scope="col">Name</th>
            <th scope="col">Roles</th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
        </tr>
    );
}

export default Ownercolabhead;