import React from "react";

let email=localStorage.getItem('userEmail')
console.log(email);

function Projectcard(props) {
    return (
        <tr>
            <td>{props.date}</td>
            <td>{props.name}</td>
            <td>{props.role}</td>
            <td><button type="button" class="btn btn-primary">Open</button></td>
        </tr>
    );
}

export default Projectcard;