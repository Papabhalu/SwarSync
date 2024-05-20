import React, { useState, useEffect } from "react";
import Nav from "./Navbar";
import "./style.css";
import Projectcard from "./ColabprojectsDashboard_tablecolabcards/projectcard2";
import axios from "axios";

function Colabprojects({ Toggle }) {

  const songid=localStorage.getItem("songid");
  console.log(songid);
  
  const email = localStorage.getItem('userEmail');
  const [colaborationsPublished, setColaborationsPublished] = useState([]);
  const [colaborationsUnpublished, setColaborationsUnpublished] = useState([]);
  const [sampleData, setSampleData] = useState([]);
  async function fetchData() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user?email=${email}`);
      setSampleData(response.data);

      const allSongs = response.data.data[4].allsongs;
      const currUser = response.data.data[0].user;
      const colabs = currUser.colaborations;

      const published = [];
      const unpublished = [];

      colabs.forEach(element => {
        const song = findSongById(element.songid, allSongs);
        if (song) {
          const new_item = { colaboration_roles: element.roles }; // Fix the property name
          Object.assign(song, new_item);
          if (song.published) {
            published.push(song);
          } else {
            unpublished.push(song);
          }
        }
      });

      setColaborationsPublished(published);
      setColaborationsUnpublished(unpublished);
    } catch (error) {
      alert("An error occurred. Please try again later.");
    }
  }

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures that the effect runs only once after the initial render

  function findSongById(id, allSongs) {
    return allSongs.find(song => song._id === id);
  }

  return (
    <div className="px-3">
      <Nav Toggle={Toggle} />

      <table className="table caption-top bg-white rounded mt-2">
        <caption className="text-dark fs-4">Published Colaborations</caption>
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Name</th>
            <th scope="col">Role</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {colaborationsPublished.map((element) => (
            <Projectcard name={element.name} date={element.date} roles={element.colaboration_roles} songid={element._id} />
          ))}
        </tbody>
      </table>
      <table className="table caption-top bg-white rounded mt-2">
        <caption className="text-dark fs-4">Unpublished Colaborations</caption>
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Name</th>
            <th scope="col">Role</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {colaborationsUnpublished.map((element) => (
            <Projectcard name={element.name} date={element.date} roles={element.colaboration_roles} songid={element._id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Colabprojects;
