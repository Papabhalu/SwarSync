import React from "react";

function Projectcard(props) {


    //console.log("this is from loacl storage"+localStorage.getItem("songid"));
  const handleButtonClick = () => {
    localStorage.setItem("songid", props.songid);
    // Redirect to the new route with the songid as a URL parameter
    window.location.href = `/VersionDashboard`;
  };

  return (
    <tr>
      <td>{props.date}</td>
      <td>{props.name}</td>
      <td>{props.description}</td>
      <td>
        <button
          value={props.songid}
          type="button"
          className="btn btn-primary"
          onClick={handleButtonClick}
        >
          Open
        </button>
      </td>
    </tr>
  );
}

export default Projectcard;