import React, { useState } from 'react';
import './Login.css';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Login = () => {
    const [sign,setSign]=useState(true);
    console.log('look here');
  return (
    <div className='registerCont d-flex align-items-center justify-content-center'>
      {
        sign?<SignIn setSign={setSign} /> : <SignUp setSign={setSign} />
      }
    </div>
  )
}

export default Login
