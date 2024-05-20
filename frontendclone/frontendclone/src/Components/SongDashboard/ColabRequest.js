import React, { useState, useEffect } from 'react';
import Nav from './Navbar';
import axios from 'axios';
import Creq from './Colabrequestcards/creq';
import Applications from "./Colabrequestcards/applications";
import './style.css';

function Colabrequest({ Toggle }) {
  const [colabrequests, setColabrequests] = useState([]);
  const [allusers, setAllUsers] = useState([]);
  const [songid, setSongId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = localStorage.getItem('userEmail');
        const songid1 = localStorage.getItem('songid');
        var  response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/userinsong?email=${email}&songid=${songid1}`);
        console.log(response.data);
        setColabrequests(response.data.data[2].colaborationrequests);
        setAllUsers(response.data.data[3].allusers);
        setSongId(songid1);
        setSongId(songid);
      } catch (error) {
        console.error('Error fetching data from the backend:', error.response || error.message || error);
      }
    };

    fetchData();
  }, []); 

  function findUserById(id) {
    return allusers.find(user => user._id === id);
  }

  return (
    <div className='px-3'>
      <Nav Toggle={Toggle} />
      <button type="button" className="btn btn-primary">
        Add Collaboration Request
      </button>

      {colabrequests.map(colabrequest => (
        <div key={colabrequest._id}>
          <table className="table caption-top bg-white rounded mt-2">
            <thead>
              <Creq
                date={colabrequest.date}
                description={colabrequest.description}
                roleneeded={colabrequest.roleneeded[0]}
              />
            </thead>

            <tbody>
              {colabrequest.requests.map(application => {
                const user = findUserById(application.userid);
                return (
                  <tr key={application._id}>
                    <Applications
                      applicationname={user.name}
                      applicationmessage={application.message}
                      applicationdate={application.date}
                      email={user.email}
                      facebookurl={user.facebookurl}
                      instagramurl={user.instagramurl}
                      xurl={user.xurl}
                    />
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default Colabrequest;
