import React from 'react';
import '../styles/Dashboard.css';
import Leaderboard from '../pages/Leaderboard';

function Dashboard() {

    return (
        <div className='dashboard__component'>
            <h1>Dahsboard</h1>
            <div className="component__dashboard__main">
                <div className="component__dashboard__left">
                    <Leaderboard />
                </div>
                <div className="component__dashboard__right">
                    <h1>Right</h1>
                </div>
            </div>
        </div>
    );
}

export default Dashboard