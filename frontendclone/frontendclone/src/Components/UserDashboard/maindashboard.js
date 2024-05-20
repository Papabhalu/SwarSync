import React, { useState, useEffect } from "react";
import Nav from "./Navbar";
import "./style.css";
import Smallsongcard from "./Maindashboard_components/smallsongcard";
import Colaborationrequestcard from "./Maindashboard_components/colaborationrequestcard";
import axios from "axios";


function Maindashboard({ Toggle }) {
  const [publishedSongs, setPublishedSongs] = useState([]);
  const [allSongs, setAllSongs] = useState([]);
  const [requestsToShow, setRequestsToShow] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("I AM FETCHING DATA");
        const email = localStorage.getItem('userEmail');
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user?email=${email}`);

        if (!response.data || !response.data.data) {
          console.error("Invalid backend response structure");
          return;
        }

        const allSongsArray = response.data.data.find(item => item.allsongs)?.allsongs || [];
        setAllSongs(allSongsArray);

        if (allSongsArray.length === 0) {
          console.log("No songs found for the user");
          return;
        }

        console.log(allSongsArray);

        const publishedSongsArray = allSongsArray.filter(element => element.published === true);
        console.log(publishedSongsArray);
        setPublishedSongs(publishedSongsArray);

        const allusers = response.data.data.find(item => item.allusers)?.users || [];

        if (!allusers || allusers.length === 0) {
          console.log("No users found");
          return;
        }

        const requestsToShowArray = response.data.data[5].find(item => item.allcolaborationrequests)?.allcolaborationrequests || [];
        console.log("request", requestsToShowArray);
        setRequestsToShow(requestsToShowArray);

        console.log(response.data);
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
        alert("An error occurred. Please try again later.");
      }
    }

    fetchData();
  }, []);


  return (
    <div className="px-3">
      <Nav Toggle={Toggle} />
      <div className="container-fluid">
        {/* for songs v */}
        <div className="row g-3 my-2">
          {publishedSongs.map(element => (
            <Smallsongcard
              key={element._id}
              name={element.name}
              duration={element.duration}
              path={element.mainaudiofile[0]?.path || ''}
              imagepath={element.image || ''}
            />
          ))}
        </div>
      </div>
      <table className="table caption-top bg-white rounded mt-2">
        <caption className="text-white fs-4">Recent Colab Posts</caption>
        <thead>
          <tr>
            <th scope="col">Project</th>
            <th scope="col">Owner</th>
            <th scope="col">Genre</th>
            <th scope="col">Role</th>
            <th scope="col">Description</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {requestsToShow.map(async element => {
            let owner_name = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/finduserwithid?id=${element.owner}`);
                        return (
              <Colaborationrequestcard
                key={element._id}
                name={allSongs.find(song => song._id === element.songid)?.name || ''}
                owner={owner_name}
                genre={allSongs.find(song => song._id === element.songid)?.genres || ''}
                role={element.roleneeded}
                description={element.description}
                crid={element._id}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Maindashboard;