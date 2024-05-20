import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Ownersidebar from './OwnerSidebar';
import Colaboratorsidebar from './ColaboratorSidebar';
import Home from './Home';
import Versions from './Versions';
import Colaborators from './Colaborators';
import Chat from './Chat';
import Colabrequest from './ColabRequest';
import './style.css';
import { useState } from 'react';
import CR from './ColabRequest';

let email=localStorage.getItem('userEmail')
console.log(email);

function ColabDashboard() {
  const [toggle, setToggle] = useState(true);

  const Toggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className='container-fluid bg-secondary min-vh-100'>
      <div className='row '>
        {toggle && (
          <div className='col-4 col-md-2 bg-white vh-100 position-fixed'>
            <Ownersidebar />
          </div>
        )}
        {toggle && <div className='col-4 col-md-2'></div>}
        <div className='col' id="bg">
          <CR Toggle={Toggle} />
        </div>
      </div>
    </div>
  );
}

export default ColabDashboard;