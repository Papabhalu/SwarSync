import React from 'react';
import './style.css';

let email=localStorage.getItem('userEmail')
console.log(email);

function Colaboratorsidebar() {
    const Song = 'Song Name';
  return (
    <div className='bg-white sidebar p-1'>
      <div className='m-2'>
        <i className='bi bi-bootstrap-fill me-3 fs-3'></i>
        <span className='brand-name fs-5'>{Song}</span>
      </div>
      <hr className='text-dark' />
      <div className='list-group list-group-flush'>
        <a href="/VersionDashboard" className='list-group-item py-2'>
          <i className="bi bi-file-earmark-diff fs-5 me-3"></i>
          <span>Versions</span>
        </a>
        <a className='list-group-item py-2 '>
          <i className="bi bi-upload fs-5 me-3"></i>
          <span>Upload File</span>
        </a>
        <a href="/ChatDashboard" className='list-group-item py-2'>
          <i className="bi bi-chat-dots fs-5 me-3"></i>
          <span>Chat</span>
        </a>
        <a href="/ColaboratorsDashboard" className='list-group-item py-2'>
          <i className="bi bi-people fs-5 me-3"></i>
          <span>Colaborators</span>
        </a>
        <button type="button" class="btn btn-danger fs-6 me-3 mt-4">Leave</button>
      </div>
    </div>
  );
}

export default Colaboratorsidebar;
