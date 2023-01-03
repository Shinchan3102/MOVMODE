import React from 'react';
import { NavLink } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className='d-flex justify-content-center align-items-center flex-column' style={{ color: 'white',width:'100vw',height:'100vh' }}>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <h4>Looks like you got so far...</h4>
      <h4><NavLink to={'/'} className='btn Danger'>Back to Home</NavLink></h4>
    </div>
  )
}

export default NotFound
