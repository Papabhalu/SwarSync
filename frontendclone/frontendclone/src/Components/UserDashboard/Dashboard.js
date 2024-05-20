import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Sidebar from './Sidebar';
import Maindashboard from './maindashboard';
import './style.css';
import { useState } from 'react';


let email=localStorage.getItem('userEmail')
console.log(email);

function Dashboard() {
  const [toggle, setToggle] = useState(true);

  const Toggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className='container-fluid bg-secondary min-vh-100'>
      <div className='row '>
        {toggle && (
          <div className='col-4 col-md-2 bg-white vh-100 position-fixed'>
            <Sidebar />
          </div>
        )}
        {toggle && <div className='col-4 col-md-2'></div>}
        <div className='col' id="bg">
          <Maindashboard Toggle={Toggle} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;