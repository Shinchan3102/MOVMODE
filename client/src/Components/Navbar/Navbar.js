import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { MdLightMode } from 'react-icons/md';
import { FiMoon } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import Login from '../Login/Login';
import decode from 'jwt-decode';
import MediaSearch from '../MediaSearch/MediaSearch';
import Loading from '../Loading/Loading';
import { FaHome } from 'react-icons/fa';
import { BsDisplay, BsCollectionPlay, BsHeart, BsArrowRight } from 'react-icons/bs';
import { RxPerson, RxCross2 } from 'react-icons/rx';

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

    const title = [
        ['M', '20px', '3px'],
        ['O', '18px', '3px'],
        ['V', '16px', '3px'],
        ['M', '14px', '3px'],
        ['O', '16px', '3px'],
        ['D', '18px', '3px'],
        ['E', '20px', '3px']
    ];

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <div className='row'>
                <nav className={`navbar navbar-expand-lg navbar-${isDark ? 'dark' : 'light'} bg-transparent navDesign`}>
                    <div className="container-fluid  mx-auto col-md-10 col-11">
                        <NavLink className="navbar-brand me-5 d-flex align-items-center justify-content-center fw-bold fs-2" to='/' style={{color:'rgb(11 96 224)'}}>
                            {/* {
                                title.map((word, index) => {
                                    return (
                                        <div style={{ fontSize: word[1], paddingRight: word[2] }} key={index}>
                                            {word[0]}
                                        </div>
                                    )
                                })
                            } */}
                            MOVMODE
                        </NavLink>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                                <li className='nav-item m-2'>
                                    <MediaSearch />
                                </li>
                            </ul>
                            <ul className='navbar-nav d-flex justify-content-center align-items-center'>
                                <li className='nav-item'>
                                    {
                                        isDark ?
                                            <FiMoon className='Dark_mode' onClick={() => { dispatch({ type: 'LIGHT' }) }} />
                                            :
                                            <MdLightMode className='Light_mode' onClick={() => { dispatch({ type: 'DARK' }) }} />
                                    }
                                </li>
                                <li className='nav-item'>
                                    {user ?
                                        <button className='m-2 btn Danger' onClick={logout}>Logout</button>
                                        :
                                        <button className='m-2 btn Danger' onClick={setRegister}>Register</button>
                                    }
                                </li>
                            </ul>

                        </div>
                    </div>
                </nav>
            </div>
            {isRegister ? <Login /> : ''}
            <div className='navbarCont'>
                <div className='navbarElements' style={{ color: 'white', fontSize: '20px' }}>
                    <div className='d-flex align-items-center justify-content-center accountLarge'>
                        <BsArrowRight style={{ cursor: 'pointer' }} className={`accountLarge ${displayElement ? 'hideDesc' : ''}`} onClick={() => setDisplayElement(true)} />
                        <NavLink to='/' className={` text-decoration-none ${displayElement ? '' : 'hideDesc'}`} onClick={() => setActiveElement('home')} style={{ color: 'white', fontSize: '23px', cursor: 'pointer' }}>
                            <div className={`me-2 ${displayElement ? '' : 'hideDesc'}`}>MOVMODE</div>
                        </NavLink>
                        <RxCross2 className={`${displayElement ? '' : 'hideDesc'}`} onClick={() => setDisplayElement(false)} style={{ cursor: 'pointer' }} />
                    </div>
                    <hr className='accountLarge' />
                    <NavLink to='/' onClick={() => setActiveElement('home')} className={`d-flex align-items-center text-decoration-none navbarHovEffect ${activeElement === 'home' ? 'navActiveElement' : ''}`}>
                        <FaHome /> <div className={`ms-2 ${displayElement ? '' : 'hideDesc'}`} >Home</div>
                    </NavLink>
                    <NavLink to='/media/movie' onClick={() => setActiveElement('movie')} className={`d-flex align-items-center text-decoration-none navbarHovEffect ${activeElement === 'movie' ? 'navActiveElement' : ''}`}>
                        <BsCollectionPlay /><div className={`ms-2 ${displayElement ? '' : 'hideDesc'}`} >Movie</div>
                    </NavLink>
                    <NavLink to='/media/tv' onClick={() => setActiveElement('tv')} className={`d-flex align-items-center text-decoration-none navbarHovEffect ${activeElement === 'tv' ? 'navActiveElement' : ''}`}>
                        <BsDisplay /> <div className={`ms-2 ${displayElement ? '' : 'hideDesc'}`} > TV Series</div>
                    </NavLink>
                    <NavLink to={`${user?.token ? '/favorites' : '/'}`} onClick={() => user?.token ? setActiveElement('fav') : dispatch({ type: 'REG' })} className={`d-flex align-items-center text-decoration-none navbarHovEffect ${activeElement === 'fav' ? 'navActiveElement' : ''}`}>
                        <BsHeart /> <div className={`ms-2 ${displayElement ? '' : 'hideDesc'}`} >Favorites</div>
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
