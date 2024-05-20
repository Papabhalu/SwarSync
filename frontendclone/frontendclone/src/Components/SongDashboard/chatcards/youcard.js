import React from "react";

function Yourcard(props) {
    return (
        <table className="table table-success caption-top bg-white rounded mt-2">
        <thead>
          <tr>
            <th scope="col">You</th>
            <th scope="col">{props.message}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td scope="col">{props.time}</td>
            <td scope="col"></td>
          </tr>
        </tbody>
      </table>
    );
}

export default Yourcard;