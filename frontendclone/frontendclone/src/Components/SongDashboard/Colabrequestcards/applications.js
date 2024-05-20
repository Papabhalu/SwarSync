import React from "react";


let email=localStorage.getItem('userEmail')
console.log(email);
function applications(props) {
    return (
        <tr>
            <td>{props.applicationname}</td>
            <td>{props.applicationmessage}</td>
            <td>{props.applicationdate}</td>
            <td><a href={`mailto:${props.email}`} target="blank"><i class="bi bi-envelope fs-3"></i></a></td>
            <td><a href={props.facebookurl} target="blank"><i class="bi bi-facebook fs-3"></i></a></td>
            <td><a href={props.instagramurl} target="blank"><i class="bi bi-instagram fs-3"></i></a></td>
            <td><a href={props.xurl} target="blank"><i class="bi bi-twitter-x fs-3"></i></a></td>
            <td><button type="button" class="btn btn-success">Accept</button></td>
            <td><button type="button" class="btn btn-danger">Reject</button></td>
        </tr>
    );
}

export default applications;