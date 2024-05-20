import React from "react";

let email=localStorage.getItem('userEmail')
console.log(email);

function Filescomponent(props) {
    return (
        <tr>
            <td className="fs-6">{props.date}</td>
            <td>{props.name}</td>
            <td>{props.description}</td>
            <td>{props.size}</td>
            <td><i value={props.path} className='bi bi-play-circle fs-3'></i></td>
        </tr>
    );
}

export default Filescomponent;