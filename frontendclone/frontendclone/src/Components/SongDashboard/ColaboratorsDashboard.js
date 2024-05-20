import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Ownersidebar from './OwnerSidebar';
import Colaboratorsidebar from './ColaboratorSidebar';
import Colaborators from './Colaborators';

function ColaboratorsDashboard() {
  const [toggle, setToggle] = useState(true);
  const [isOwner, setIsOwner] = useState(''); // Default value, change it based on fetched data

  const Toggle = () => {
    setToggle(!toggle);
  };
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
// Empty dependency array to ensure useEffect runs only once on component mount

  return (
    <div className='container-fluid bg-secondary min-vh-100'>
      <div className='row '>
        {toggle && (
          <div className='col-4 col-md-2 bg-white vh-100 position-fixed'>
            {isOwner ? <Ownersidebar /> : <Colaboratorsidebar />}
          </div>
        )}
        {toggle && <div className='col-4 col-md-2'></div>}
        <div className='col' id="bg">
          <Colaborators Toggle={Toggle} />
        </div>
      </div>
    </div>
  );
}

export default ColaboratorsDashboard;
