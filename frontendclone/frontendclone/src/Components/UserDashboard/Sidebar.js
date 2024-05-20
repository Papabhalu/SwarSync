import React from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';

let email=localStorage.getItem('userEmail')
console.log(email);

function Sidebar() {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.clear();
    navigate('/');
  }
  const Name = 'User Name';
  return (
    <div className='bg-white sidebar p-1'>
      <div className='m-2'>
        <i className='bi bi-bootstrap-fill me-3 fs-3'></i>
        <span className='brand-name fs-5'>{Name}</span>
      </div>
      <hr className='text-dark' />
      <div className='list-group list-group-flush'>
        <a href="/Dashboard" className='list-group-item py-2'>
          <i className='bi bi-speedometer2 fs-5 me-3'></i>
          <span>Dashboard</span>
        </a>
        <a href="/UserProfile" className='list-group-item py-2'>
          <i className="bi bi-person-circle fs-5 me-3"></i>
          <span>Profile</span>
        </a>
        <a href="/ProjectDashboard" className='list-group-item py-2 '>
          <i className="bi bi-folder fs-5 me-3"></i>
          <span>My Projects</span>
        </a>
        <a href="/ColabprojectDashboard" className='list-group-item py-2'>
          <i className="bi bi-link-45deg fs-5 me-3"></i>
          <span>Colaborations</span>
        </a>
        <a href="/MyfilesDashboard" className='list-group-item py-2'>
          <i className="bi bi-file-earmark-music fs-5 me-3"></i>
          <span>My Files</span>
        </a>
        <a href="#" className='list-group-item py-2'>
          <i className="bi bi-file-earmark-music fs-5 me-3"></i>
          <span>Video Meet</span>
        </a>

        {/* <a className='list-group-item py-2'>
          <i className='bi bi-power fs-5 me-3'></i>
          <span>Logout</span>
        </a> */}

        <button type="button" onClick={handleLogout } class="btn btn-danger fs-6 me-3 mt-4">Logout</button>
      </div>
    </div>
  );
}

export default Sidebar;
