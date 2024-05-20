import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from './Navbar';
import Ownercolabhead from './tablecolabcards/ownercolabhead';
import Ownercolabcard from './tablecolabcards/ownercolabcard';
import colabcard from './tablecolabcards/colabcard';
import colabhead from './tablecolabcards/colabhead';
import './style.css';

let email = localStorage.getItem('userEmail');
console.log(email);

function Colaborators({ Toggle }) {
  const [isOwner, setIsOwner] = useState(false);
  const [colaborators, setColaborators] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = localStorage.getItem('userEmail');
        const songid = localStorage.getItem('songid');
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/userinsong?email=${email}&songid=${songid}`);
        // Assuming the response has a property 'isowner'
        setIsOwner(response.data.data[0].isowner);

        const colaborations = response.data.data[0].song.colaborations;
        const allusers = response.data.data[3].allusers;
        const colaboratorsData = [];

        colaborations.forEach((colab) => {
          const foundUser = allusers.find((user) => user._id === colab.userid);
          colaboratorsData.push({
            colaborator: foundUser,
            colaborationid: colab._id,
            role_in_colaboration: colab.roles
          });
        });

        setColaborators(colaboratorsData);
      } catch (error) {
        console.error('Error fetching user data from the backend:', error.response || error.message || error);
      }
    };

    fetchData();
  }, []);

  let HeadComponent;
  let CardComponent;

  if (isOwner) {
    HeadComponent = Ownercolabhead;
    CardComponent = Ownercolabcard;
  } else {
    HeadComponent = colabhead;
    CardComponent = colabcard;
  }

  const [toggle, setToggle] = useState(true);

  return (
    <div className='px-3'>
      <Nav Toggle={Toggle} />

      <table className="table caption-top bg-white rounded mt-2">
        <thead>
          <HeadComponent />
        </thead>
        {toggle && (
          <tbody>
            {colaborators.map((user, index) => (
              <CardComponent
                key={index}
                name={user.colaborator.name}
                roles={user.role_in_colaboration}
                email={user.colaborator.email}
                facebookurl={user.colaborator.facebookUrl}
                instagramurl={user.colaborator.instagramUrl}
                xurl={user.colaborator.xUrl}
              />
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

export default Colaborators;
