import React from "react";
import Applications from "./applications";


let email=localStorage.getItem('userEmail')
console.log(email);
function creq(props) {
    return (
        // <table className="table caption-top bg-white rounded mt-2">
        // <thead>
          <tr>
            <th scope="col">{props.date}</th>
            <th scope="col">{props.description}</th>
            <th scope="col">{props.roleneeded}</th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"><button type="button" class="btn btn-danger fs-6 me-3 mt-1">Delete</button></th>
          </tr>
        // </thead>

      // </table>
    );
}

export default creq;