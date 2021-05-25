import React, { useState, useEffect } from 'react';
import Countdown from 'react-countdown';
import './index.scss';
import Layout from '../components/layout';

const IndexPage = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isTimerOn, setIsTimerOn] = useState(false);
    const [pomoType, setPomoType] = useState('pomo');
    const [pomoTime, setPomoTime] = useState(25);
    const [shortTime, setShortTime] = useState(5);
    const [longTime, setLongTime] = useState(15);
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    const handlePomoType = type => {
        setPomoType(type);

        if (type === 'pomo') {
            setMinutes(pomoTime);
            setSeconds(0);
        } else if (type === 'short') {
            setMinutes(shortTime);
            setSeconds(0);
        } else if (type === 'long') {
            setMinutes(longTime);
            setSeconds(0);
        }
    };

    const handleNewTime = e => {
        if (
            e.target.name === 'pomo' &&
            e.target.value > 0 &&
            e.target.value < 100
        )
            setPomoTime(e.target.value);
        if (
            e.target.name === 'short' &&
            e.target.value > 0 &&
            e.target.value < 100
        )
            setShortTime(e.target.value);
        if (
            e.target.name === 'long' &&
            e.target.value > 0 &&
            e.target.value < 100
        )
            setLongTime(e.target.value);
    };

    const handleNewTask = e => {
        setNewTask(e.target.value);
    };

    const pushToTasks = () => {
        setTasks(...tasks, newTask);
        console.log(tasks);
    };

    const setTime = () => {
        if (pomoType === 'pomo') {
            setMinutes(pomoTime);
            setSeconds(0);
        } else if (pomoType === 'short') {
            setMinutes(shortTime);
            setSeconds(0);
        } else if (pomoType === 'long') {
            setMinutes(longTime);
            setSeconds(0);
        }
    };

    useEffect(() => {
        let interval = null;
        if (isTimerOn) {
            interval = setInterval(() => {
                if (seconds === 0) {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                } else setSeconds(seconds - 1);
            }, 1000);
            if (minutes === 0 && seconds === 0) {
                clearInterval(interval);
                setTimeout(() => {
                    setIsTimerOn(false);
                    if (pomoType === 'pomo') {
                        setPomoType('short');
                        setMinutes(shortTime);
                        setSeconds(0);
                    } else if (pomoType === 'short') {
                        setPomoType('pomo');
                        setMinutes(pomoTime);
                        setSeconds(0);
                    } else if (pomoType === 'long') {
                        setPomoType('pomo');
                        setMinutes(pomoTime);
                        setSeconds(0);
                    }
                }, 3000);
            }
        } else if (!isTimerOn) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isTimerOn, seconds]);

    return (
        <Layout darkMode={isDarkMode} setIsDarkMode={setIsDarkMode}>
            <main>
                <div className="pomo">
                    <div className="pomo-timer">
                        <nav className="pomo-nav">
                            <ul>
                                {pomoType === 'pomo' ? (
                                    <li className="li-active">Pomodoro</li>
                                ) : (
                                    <li onClick={() => handlePomoType('pomo')}>
                                        Pomodoro
                                    </li>
                                )}
                                {pomoType === 'short' ? (
                                    <li className="li-active">Short Break</li>
                                ) : (
                                    <li onClick={() => handlePomoType('short')}>
                                        Short Break
                                    </li>
                                )}
                                {pomoType === 'long' ? (
                                    <li className="li-active">Long Break</li>
                                ) : (
                                    <li onClick={() => handlePomoType('long')}>
                                        Long Break
                                    </li>
                                )}
                            </ul>
                        </nav>
                        <div className="pomodoro">
                            <h3 className="pomodoro-minutes">
                                {minutes < 10 ? '0' : ''}
                                {minutes}
                            </h3>
                            <h3 className="pomodoro-colon">:</h3>
                            <h3 className="pomodoro-seconds">
                                {seconds < 10 ? '0' : ''}
                                {seconds}
                            </h3>
                        </div>
                        {isTimerOn ? (
                            <button onClick={() => setIsTimerOn(false)}>
                                STOP
                            </button>
                        ) : (
                            <button onClick={() => setIsTimerOn(true)}>
                                START
                            </button>
                        )}
                    </div>
                    <div className="pomo-settings">
                        <h4>Settings</h4>
                        <div className="inputs">
                            <div className="input">
                                <p>Pomodoro</p>
                                <input
                                    type="number"
                                    name="pomo"
                                    defaultValue={pomoTime}
                                    onChange={handleNewTime}
                                />
                            </div>
                            <div className="input">
                                <p>Short Break</p>
                                <input
                                    type="number"
                                    name="short"
                                    defaultValue={shortTime}
                                    onChange={handleNewTime}
                                />
                            </div>
                            <div className="input">
                                <p>Long Break</p>
                                <input
                                    type="number"
                                    name="long"
                                    defaultValue={longTime}
                                    onChange={handleNewTime}
                                />
                            </div>
                        </div>
                        <button onClick={setTime}>SET</button>
                    </div>
                </div>

                <div className="tasks">
                    <div className="tasks-field">
                        <div className="new-task">
                            <input
                                placeholder="Add new task"
                                onChange={handleNewTask}
                            />
                            <button onClick={pushToTasks}>ADD</button>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
};

export default IndexPage;
