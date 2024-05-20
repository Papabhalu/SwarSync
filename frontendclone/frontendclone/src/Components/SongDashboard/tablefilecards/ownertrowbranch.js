import React from "react";


let email=localStorage.getItem('userEmail')
console.log(email);
function Ownertrowbranch(props) {
    return (
        <tr>
            <td className="fs-6">{props.date}</td>
            <td>{props.owner}</td>
            <td>{props.description}</td>
            <td>{props.size}</td>
            <td><i value={props.path} className='bi bi-play-circle fs-3'></i></td>
            <td><button type="button" class="btn btn-success">Merge</button></td>
            <td><button type="button" class="btn btn-danger">Delete</button></td>
        </tr>
    );
}

export default Ownertrowbranch;