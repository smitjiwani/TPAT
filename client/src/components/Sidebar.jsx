import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css';

function Sidebar(props) {
    const { avatar, userName, userEmail, options } = props;

    return (
        <div className='sidebar'>
            <h1 className="sidebar__avatar">{avatar}</h1>
            <h3 className="sidebar__name">{userName}</h3>
            <p className="sidebar__email">{userEmail}</p>
            <ul className="sidebar__options">
                {options.map((option, index) => (
                    <li key={index}>
                        <Link to={option.path}>{option.label}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
