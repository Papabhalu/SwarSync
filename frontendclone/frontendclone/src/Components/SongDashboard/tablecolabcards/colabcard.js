import React from "react";

let email=localStorage.getItem('userEmail')
console.log(email);

function colabcard(props) {
    return (
        <tr>
            <th scope="col">{props.name}</th>
            <th scope="col">{props.roles}</th>
            <th scope="col"><a href={`mailto:${props.email}`} target="blank"><i class="bi bi-envelope fs-3"></i></a></th>
            <th scope="col"><a href={props.facebookurl} target="blank"><i class="bi bi-facebook fs-3"></i></a></th>
            <th scope="col"><a href={props.instagramurl} target="blank"><i class="bi bi-instagram fs-3"></i></a></th>
            <th scope="col"><a href={props.xurl} target="blank"><i class="bi bi-twitter-x fs-3"></i></a></th>
        </tr>
    );
}

export default colabcard;