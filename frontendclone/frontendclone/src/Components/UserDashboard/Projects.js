import React, { useState, useEffect } from 'react';
import Nav from './Navbar';
import './style.css';
import Projectcard from './ProjectDashboard_tablecolabcards/projectcard';
import axios from 'axios';

function Projects({ Toggle }) {
  const [publishedSongs, setPublishedSongs] = useState([]);
  const [unpublishedSongs, setUnpublishedSongs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const email = localStorage.getItem('userEmail');
        const url = `${process.env.REACT_APP_BACKEND_URL}/user?email=${email}`
        console.log(url);
        const response = await axios.get(url);

        const currentUser = response.data.data[0].user;
        const userSongs = currentUser.songs;

        const publishedSongsArray = userSongs.filter(element => element.published === true);
        setPublishedSongs(publishedSongsArray);

        const unpublishedSongsArray = userSongs.filter(element => element.published !== true);
        setUnpublishedSongs(unpublishedSongsArray);
        console.log(response.data);
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
      }
    }
    fetchData();
    
  }, []); // Empty dependency array ensures that the effect runs only once after the initial render

  return (
    <div className='px-3'>
      <Nav Toggle={Toggle} />

      <table className="table caption-top bg-white rounded mt-2">
        <caption className='text-dark fs-4'>Published Projects</caption>
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {publishedSongs.map(element => (
            <Projectcard
              key={element._id}
              name={element.name}
              date={(element.date).slice(0, 10)}
              description={element.description}
              songid={element._id}
            />
          ))}
        </tbody>
      </table>
      <table className="table caption-top bg-white rounded mt-2">
        <caption className='text-dark fs-4'>Drafts</caption>
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {unpublishedSongs.map(element => (
            <Projectcard
              key={element._id}
              name={element.name}
              date={element.date}
              description={element.description}
              songid={element._id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Projects;
