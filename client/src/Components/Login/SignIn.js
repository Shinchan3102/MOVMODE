import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../actions/users';
import './Login.css';
import { ImCross } from 'react-icons/im';

const SignIn = ({ setSign }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [user, setUser] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        setUser({
            ...user, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user.password === '' || user.username === '')
            alert('please fill all the fields properly');
        else {
            console.log(user);
            dispatch(signIn(user, navigate));
        }
    }

    const setRegister = () => {
        dispatch({ type: 'REM_REG' });
    }
    return (
        <div className='registerSubCont mx-auto d-block' >
            <h1 className='text-center' style={{color:'red'}}>MovMode</h1>
            <div className="createGroup m-4">
                <input type="text" autoComplete="off" className={`createInput ${user.username === '' ? '' : 'labell'}`} name='username' value={user.username} onChange={handleChange} />
                <label className="user-label">Username</label>
            </div>
            <div className="createGroup m-4">
                <input type="password" autoComplete="off" className={`createInput ${user.password === '' ? '' : 'labell'}`} name='password' value={user.password} onChange={handleChange} />
                <label className="user-label">Password</label>
            </div>
            <div className='createGroup m-4'>
                <button className='btn Danger w-100' onClick={handleSubmit} >Sign In</button>
            </div>
            <div className='createGroup m-r=4'>
                <h6 className='registerDown'>
                    Don't have account? <span className='ms-2' onClick={() => { setSign(false) }}>Register</span>
                </h6>
            </div>
            <ImCross className='cross' onClick={setRegister} />
        </div>
    )
}

export default SignIn
