import React, { useState } from 'react';
import './Account.css';
import userImg from '../assets/user.png';

const Account = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  return (
    <div className='about'>
      <form className='d-flex flex-column'>
        <div className='d-flex align-items-end flex-wrap about_f_div'>
          <img src={userImg} alt='user' style={{ width: '150px',padding:'10px'}}></img>
          <div style={{color:'#ffb800'}}>
            <h3>{user?.userProfile?.displayName}</h3>
          </div>
        </div>
        <div className='ab_info'>
          <h3 style={{color:'green'}}>More Info</h3>
          <div>
            <p className='one'>User Id</p>
            <p className='two'>{user?.userProfile?._id}</p>
          </div>
          <div>
            <p className='one'>Name</p>
            <p className='two'>{user?.userProfile?.username}</p>
          </div>
          <div>
            <p className='one'>User Name</p>
            <p className='two'>{user?.userProfile?.displayName}</p>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Account
