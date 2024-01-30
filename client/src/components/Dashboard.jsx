import React from 'react';
import '../styles/Dashboard.css';
import Leaderboard from '../pages/Leaderboard';

function Dashboard() {

    return (
        <div className='dashboard__component'>
            <h1>Dashboard</h1>
            <div className="component__dashboard__main">
                <div className="component__dashboard__left">
                    <Leaderboard />
                </div>
                <div className="component__dashboard__right">
                    <h3>Most Positive Keywords</h3>
                    <h3>Most negative keywords</h3>
                    <h3>Most Used Emojis</h3>
                </div>
            </div>


            <div className="line__chartforscore">
                <h1>Line Chart for Scores</h1>
            </div>




        </div>
    );
}

export default Dashboard
