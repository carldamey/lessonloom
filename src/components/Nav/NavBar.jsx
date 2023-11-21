import { Link } from 'react-router-dom';
import Login from '../Login/Login';
import { useState } from 'react';
import "./NavBar.css";

export default function NavBar({user, setUser}) {
    const [ showNav, setShowNav ] = useState(false)
    return (
        <nav>
                <h2><Link to="/courses">LessonLoom</Link></h2>
                <ul className='nav-links'>
                    <li className='nav-item'><Link to="/courses">All Courses</Link></li>
                    <li className='nav-item'><Link to="/courses/create">Create a Course</Link></li>
                    <li className='nav-item'><Link to="/user">My Profile</Link></li>
                    <li className='nav-item'><Link to="/courses/test">Course</Link></li>
                    <li className='nav-item'><Link to="/user/favorites">test</Link></li>
                    <li className='nav-item'><Login showNav={showNav} setShowNav={setShowNav} use={user} setUser={setUser}/></li>
                </ul>
        </nav>
    )
}