import React, { useState } from 'react';
import Countdown from 'react-countdown';
import './index.scss';
import Layout from '../components/layout';

const IndexPage = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [pomoType, setPomoType] = useState('pomo');
    const [timer, setTimer] = useState(25000);

    const handlePomoType = type => {
        setPomoType(type);
    };

    return (
        <Layout>
            <main className="pomo">
                <div className="pomo-timer">
                    <nav className="pomo-nav">
                        <ul>
                            {pomoType == 'pomo' ? (
                                <li className="li-active">Pomodoro</li>
                            ) : (
                                <li onClick={() => handlePomoType('pomo')}>
                                    Pomodoro
                                </li>
                            )}
                            {pomoType == 'short' ? (
                                <li className="li-active">Short Break</li>
                            ) : (
                                <li onClick={() => handlePomoType('short')}>
                                    Short Break
                                </li>
                            )}
                            {pomoType == 'long' ? (
                                <li className="li-active">Long Break</li>
                            ) : (
                                <li onClick={() => handlePomoType('long')}>
                                    Long Break
                                </li>
                            )}
                        </ul>
                    </nav>
                    <h3>25:00</h3>
                    <button>START</button>
                </div>
            </main>
        </Layout>
    );
};

export default IndexPage;
