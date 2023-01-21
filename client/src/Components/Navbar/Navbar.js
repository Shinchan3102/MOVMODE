import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import Login from '../Login/Login';
import decode from 'jwt-decode';
import MediaSearch from '../MediaSearch/MediaSearch';
import Loading from '../Loading/Loading';
import { FaHome } from 'react-icons/fa';
import { BsDisplay, BsCollectionPlay, BsHeart, BsArrowRight } from 'react-icons/bs';
import { RxPerson, RxCross2 } from 'react-icons/rx';
import {RiLoginBoxFill, RiLogoutBoxFill } from 'react-icons/ri';

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isRegister, isDark, isLoading } = useSelector((state) => state.user);
    document.body.style.backgroundColor = isDark ? '#000317' : 'white';

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/');
    }

    const setRegister = () => {
        console.log('showing register page')
        dispatch({ type: 'REG' });
    }

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodeToken = decode(token);
            if (decodeToken.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const [activeElement, setActiveElement] = useState('home');
    const [displayElement, setDisplayElement] = useState(false);

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <div className='row'>
                <nav className={`navbar navbar-expand-lg navbar-${isDark ? 'dark' : 'light'} bg-transparent navDesign`}>
                    <div className="container-fluid mx-auto col-md-10 col-11 navSmall">
                        <NavLink className="text-decoration-none fw-bold fs-2 accountLarge" to='/' style={{ color: 'rgb(11 96 224)' }}>
                            MOVMODE
                        </NavLink>
                        <NavLink className="text-decoration-none fw-bold fs-2 accountShort" to='/' style={{ color: 'rgb(11 96 224)' }}>
                            MM
                        </NavLink>
                        <ul className="mx-auto mb-2 mb-lg-0 ps-0">
                            <li className='listStyle m-2'>
                                <MediaSearch />
                            </li>
                        </ul>
                        <ul className='d-flex justify-content-center align-items-center accountLarge'>
                            <li className='listStyle accountLarge'>
                                {
                                    isDark ?
                                        <MdDarkMode className='Dark_mode accountLarge' onClick={() => { dispatch({ type: 'LIGHT' }) }} />
                                        :
                                        <MdLightMode className='Light_mode accountLarge' onClick={() => { dispatch({ type: 'DARK' }) }} />
                                }
                            </li>
                                {user ?
                                    <RiLogoutBoxFill className='m-2 registerBtn loginBtn accountLarge' onClick={logout} />
                                    :
                                    <RiLoginBoxFill className='m-2 registerBtn accountLarge' onClick={setRegister} />
                                }
                        </ul>
                        <ul className='d-flex justify-content-center align-items-center accountShort' style={{position:'fixed', bottom:'50px',right:'10px'}}>
                            <li className='listStyle accountShort'>
                                {
                                    isDark ?
                                        <MdDarkMode className='Dark_mode accountShort' onClick={() => { dispatch({ type: 'LIGHT' }) }} />
                                        :
                                        <MdLightMode className='Light_mode accountShort' onClick={() => { dispatch({ type: 'DARK' }) }} />
                                }
                            </li>
                                {user ?
                                    <RiLogoutBoxFill className='m-2 registerBtn loginBtn accountShort' onClick={logout} />
                                    :
                                    <RiLoginBoxFill className='m-2 registerBtn accountShort' onClick={setRegister} />
                                }
                        </ul>
                    </div>
                </nav>
            </div>
            {isRegister ? <Login /> : ''}
            <div className='navbarCont'>
                <div className='navbarElements' style={{ color: 'white', fontSize: '20px' }}>
                    <div className='d-flex align-items-center justify-content-center accountLarge'>
                        <BsArrowRight style={{ cursor: 'pointer' }} className={`accountLarge ${displayElement ? 'hideDesc' : ''}`} onClick={() => setDisplayElement(true)} />
                        <NavLink to='/' className={` text-decoration-none ${displayElement ? '' : 'hideDesc'}`} onClick={() => setActiveElement('home')} style={{ color: 'white', fontSize: '23px', cursor: 'pointer' }}>
                            <div className={`me-2 ${displayElement ? '' : 'hideDesc'} accountLarge`}>MOVMODE</div>
                        </NavLink>
                        <RxCross2 className={`${displayElement ? '' : 'hideDesc'} accountLarge`} onClick={() => setDisplayElement(false)} style={{ cursor: 'pointer' }} />
                    </div>
                    <hr className='accountLarge' />
                    <NavLink to='/' onClick={() => setActiveElement('home')} className={`d-flex align-items-center text-decoration-none navbarHovEffect ${activeElement === 'home' ? 'navActiveElement' : ''}`}>
                        <FaHome /> <div className={`ms-2 ${displayElement ? '' : 'hideDesc'} accountLarge`} >Home</div>
                    </NavLink>
                    <NavLink to='/media/movie' onClick={() => setActiveElement('movie')} className={`d-flex align-items-center text-decoration-none navbarHovEffect ${activeElement === 'movie' ? 'navActiveElement' : ''}`}>
                        <BsCollectionPlay /><div className={`ms-2 ${displayElement ? '' : 'hideDesc'} accountLarge`} >Movie</div>
                    </NavLink>
                    <NavLink to='/media/tv' onClick={() => setActiveElement('tv')} className={`d-flex align-items-center text-decoration-none navbarHovEffect ${activeElement === 'tv' ? 'navActiveElement' : ''}`}>
                        <BsDisplay /> <div className={`ms-2 ${displayElement ? '' : 'hideDesc'} accountLarge`} > TV Series</div>
                    </NavLink>
                    <NavLink to={`${user?.token ? '/favorites' : '/'}`} onClick={() => user?.token ? setActiveElement('fav') : dispatch({ type: 'REG' })} className={`d-flex align-items-center text-decoration-none navbarHovEffect ${activeElement === 'fav' ? 'navActiveElement' : ''}`}>
                        <BsHeart /> <div className={`ms-2 ${displayElement ? '' : 'hideDesc'} accountLarge`} >Favorites</div>
                    </NavLink>
                    <NavLink to={`${user?.token ? '/account' : '/'}`} onClick={() => user?.token ? setActiveElement('account') : dispatch({ type: 'REG' })} className={`accountShort text-decoration-none navbarHovEffect ${activeElement === 'account' ? 'navActiveElement' : ''}`} style={{ fontSize: '20px' }}>
                        <RxPerson className='accountShort' />
                    </NavLink>
                </div>
                <div className='accountLarge'>
                    <NavLink to={`${user?.token ? '/account' : '/'}`} onClick={() => user?.token ? setActiveElement('account') : dispatch({ type: 'REG' })} className={`accountLarge d-flex align-items-center text-decoration-none navbarHovEffect ${activeElement === 'account' ? 'navActiveElement' : ''}`} style={{ fontSize: '20px' }}>
                        <RxPerson className='accountLarge' /> <div className={`ms-2 ${displayElement ? '' : 'hideDesc'}`} >Account</div>
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default Navbar
