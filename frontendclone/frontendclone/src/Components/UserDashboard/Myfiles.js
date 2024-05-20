import React, { useState, useEffect } from 'react';
import Nav from './Navbar';
import './style.css';
import Filescomponent from './MyfilesDashboard_components/files';
import axios from "axios";

function Myfiles({ Toggle }) {
  const [audioFiles, setAudioFiles] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const email = localStorage.getItem('userEmail');
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user?email=${email}`);

        const currentUser = response.data.data[0].user;
        const userAudioFiles = currentUser.audiofiles;

        setAudioFiles(userAudioFiles);
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
        // Handle error, e.g., show an error message to the user
      }
    }

    fetchData();
  }, []); // Empty dependency array ensures that the effect runs only once after the initial render

  return (
    <div className='px-3'>
      <Nav Toggle={Toggle} />

      <table className="table caption-top bg-white rounded mt-2">
        <caption className='text-dark fs-4'>My Files</caption>
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Project</th>
            <th scope="col">Description</th>
            <th scope="col">Size</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {audioFiles.map(function (element) {
            return (
              <Filescomponent
                key={element.id} // Make sure to include a unique key for each element
                date={element.date.substring(0, 10)}
                description={element.filedescription}
                name={element.name}
                size={element.size}
                path={element.path}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Myfiles;
