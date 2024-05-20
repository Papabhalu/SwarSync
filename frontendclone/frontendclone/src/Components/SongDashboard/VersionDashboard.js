import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Ownersidebar from './OwnerSidebar';
import Colaboratorsidebar from './ColaboratorSidebar';
import Versions from './Versions';
import './style.css';

function VersionDashboard() {
  const [toggle, setToggle] = useState(true);
  const [isOwner, setIsOwner] = useState(''); // Initialize as false, update after data fetch
  const [loading, setLoading] = useState(true);
  const [songid, setSongId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = localStorage.getItem('userEmail');
        const songid = localStorage.getItem('songid');
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/userinsong?email=${email}&songid=${songid}`);
        // Assuming the response has a property 'isowner'
        setIsOwner(response.data.data[0].isowner);
        console.log(response.data.data[0].isowner);
      } catch (error) {
        console.error('Error fetching user data from the backend:', error.response || error.message || error);
      }
    };

    fetchData();
  }, []); 
  const Toggle = () => {
    setToggle(!toggle);
  };

//   if (loading) {
//     return <p>Loading...</p>;
//   }
  console.log(isOwner);
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
          <Versions Toggle={Toggle} />
        </div>
      </div>
    </div>
  );
}

export default VersionDashboard;
