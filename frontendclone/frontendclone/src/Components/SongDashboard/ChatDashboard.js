import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Ownersidebar from './OwnerSidebar';
import Colaboratorsidebar from './ColaboratorSidebar';
import Home from './Home';
import Versions from './Versions'; // Import the Versions component
import Colaborators from './Colaborators';
import Chat from './Chat';
import './style.css';
import axios from 'axios';

let email = localStorage.getItem('userEmail');
console.log(email);

function SongDashboard() {
  const [toggle, setToggle] = useState(true);
  const [isOwner, setIsOwner] = useState('');
  const [songid, setSongId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const songid1 = localStorage.getItem('songid');
        console.log(songid1);

        var response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/userinsong?email=${email}&songid=${songid1}`);
        // console.log(response.data);
        setIsOwner(response.data.data[0].isowner);
        setSongId(songid1);
      } catch (error) {
        console.error('Error fetching data from the backend:', error.response || error.message || error);
      }
    };

    fetchData();
  }, []); // Include email in the dependency array if it's used inside the useEffect

  const Toggle = () => {
    setToggle(!toggle);
  };

  let SidebarComponent;

  if (isOwner) {
    SidebarComponent = Ownersidebar;
  } else {
    SidebarComponent = Colaboratorsidebar;
  }

  return (
    <div className='container-fluid bg-secondary min-vh-100'>
      <div className='row '>
        {toggle && (
          <div className='col-4 col-md-2 bg-white vh-100 position-fixed'>
            <SidebarComponent />
          </div>
        )}
        {toggle && <div className='col-4 col-md-2'></div>}
        <div className='col' id="bg">
          <Chat Toggle={Toggle} />
        </div>
      </div>
    </div>
  );
}

export default SongDashboard;
