import React from 'react';
import '../styles/Sidebar.css';

function Sidebar(props) {
    const { avatar, userName, userEmail, options, userScore } = props;

    return (
        <div className='sidebar'>
            <h1 className="sidebar__avatar">{avatar}</h1>
            <h3 className="sidebar__name">{userName}</h3>
            <p className="sidebar__email">{userEmail}</p>
            <p className='sidebar__score'>{userScore}</p>
            <ul className="sidebar__options">
                {options.map((option, index) => (
                    <li key={index}>
                        <div onClick={option.onclick}>{option.label}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
