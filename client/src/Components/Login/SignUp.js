import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../actions/users';
import './Login.css';
import { ImCross } from 'react-icons/im';

const SignUp = ({ setSign }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [user, setUser] = useState({ username: '', displayName: '', password: '' });

    const handleChange = (e) => {
        setUser({
            ...user, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user.password === '' || user.username === '' || user.displayName === '')
            alert('please fill all the fields properly');
        else {
            console.log(user);
            dispatch(signUp(user, navigate));
        }
    }

    const setRegister = () => {
        dispatch({ type: 'REM_REG' });
    }
    return (
        <div className='registerSubCont mx-auto d-block'>
            <h1 className='text-center'>MovMode</h1>
            <div className="createGroup m-4">
                <input required type="text" autoComplete="off" className={`createInput ${user.username === '' ? '' : 'labell'}`} name='username' value={user.username} onChange={handleChange} />
                <label className="user-label">Username</label>
            </div>
            <div className="createGroup m-4">
                <input required type="text" autoComplete="off" className={`createInput ${user.displayName === '' ? '' : 'labell'}`} name='displayName' value={user.displayName} onChange={handleChange} />
                <label className="user-label">Display Name</label>
            </div>
            <div className="createGroup m-4">
                <input required type="password" autoComplete="off" className={`createInput ${user.password === '' ? '' : 'labell'}`} name='password' value={user.password} onChange={handleChange} />
                <label className="user-label">Password</label>
            </div>
            <div className='createGroup m-4'>
                <button onClick={handleSubmit} className='btn Danger w-100'>Register</button>
            </div>
            <div className='createGroup m-r=4'>
                <h6 className='registerDown'>
                    Already registered? <span className='ms-2' onClick={() => { setSign(true) }}>Login</span>
                </h6>
            </div>
            <ImCross className='cross' onClick={setRegister} />
        </div>
    )
}

export default SignUp
