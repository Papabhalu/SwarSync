import React from "react";

function Othercard(props) {
    return (
        <table className="table caption-top bg-white rounded mt-2">
        <thead>
          <tr>
            <th scope="col">{props.sender}</th>
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

export default Othercard;