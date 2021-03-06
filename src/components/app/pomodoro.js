import React, { useEffect, useRef, useState } from 'react';

function Pomodoro({ alert, click }) {
    const [mode, setMode] = useState('pomo');
    const [pomoTime, setPomoTime] = useState(25);
    const [shortTime, setShortTime] = useState(5);
    const [longTime, setLongTime] = useState(15);

    const timeoutLeft = useRef(pomoTime * 60 * 1000);
    const initialTimestampRef = useRef();
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(pomoTime * 60 * 1000);

    const handlePomoType = type => {
        setMode(type);
        setIsRunning(false);

        if (type === 'pomo') {
            setTime(pomoTime * 60 * 1000);
            timeoutLeft.current = pomoTime * 60 * 1000;
        } else if (type === 'short') {
            setTime(shortTime * 60 * 1000);
            timeoutLeft.current = shortTime * 60 * 1000;
        } else if (type === 'long') {
            setTime(longTime * 60 * 1000);
            timeoutLeft.current = longTime * 60 * 1000;
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

    const setNewTime = () => {
        if (mode === 'pomo') {
            setTime(pomoTime * 60 * 1000);
            timeoutLeft.current = pomoTime * 60 * 1000;
            setIsRunning(false);
        } else if (mode === 'short') {
            setTime(shortTime * 60 * 1000);
            timeoutLeft.current = shortTime * 60 * 1000;
            setIsRunning(false);
        } else if (mode === 'long') {
            setTime(longTime * 60 * 1000);
            timeoutLeft.current = longTime * 60 * 1000;
            setIsRunning(false);
        }
    };

    const playSound = sound => {
        let audio = new Audio(sound);
        audio.play();
    };

    useEffect(() => {
        if (!isRunning) {
            return;
        }

        const intervalId = setInterval(run, 1000 / 60);

        function run() {
            setTime(
                timeoutLeft.current -
                    (performance.now() - initialTimestampRef.current)
            );
        }

        if (Math.floor(time / 1000) === 0) {
            clearInterval(intervalId);
            playSound(alert);
            setIsRunning(false);
            if (mode === 'pomo') {
                setMode('short');
                setTime(shortTime * 60 * 1000);
                timeoutLeft.current = shortTime * 60 * 1000;
            } else if (mode === 'short') {
                setMode('pomo');
                setTime(pomoTime * 60 * 1000);
                timeoutLeft.current = pomoTime * 60 * 1000;
            } else if (mode === 'long') {
                setMode('pomo');
                setTime(pomoTime * 60 * 1000);
                timeoutLeft.current = pomoTime * 60 * 1000;
            }
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [time, isRunning]);

    useEffect(() => {
        document.title = formatElapsedTime(time, 'title');
    });

    const start = () => {
        initialTimestampRef.current = performance.now();
        setIsRunning(true);
        playSound(click);
    };

    const stop = () => {
        timeoutLeft.current = time;
        setIsRunning(false);
        playSound(click);
    };

    const pad = num => {
        if (num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    };

    function formatElapsedTime(milliseconds, form) {
        const mins = Math.floor(milliseconds / (1000 * 60));
        milliseconds -= mins * (1000 * 60);

        const seconds = Math.floor(milliseconds / 1000);
        milliseconds -= seconds * 1000;

        if (form === 'mins') return `${pad(mins)}`;
        if (form === 'sec') return `${pad(seconds)}`;
        if (form === 'title') return `${pad(mins)}:${pad(seconds)}`;
    }

    return (
        <div className="pomo fx-col-cnt">
            <div className="pomo-timer fx-col-cnt">
                <nav className="pomo-nav">
                    <ul className="fx">
                        {mode === 'pomo' ? (
                            <li>
                                <button
                                    className="active"
                                    onClick={() => handlePomoType('pomo')}
                                >
                                    Pomodoro
                                </button>
                            </li>
                        ) : (
                            <li>
                                <button onClick={() => handlePomoType('pomo')}>
                                    Pomodoro
                                </button>
                            </li>
                        )}
                        {mode === 'short' ? (
                            <li>
                                <button
                                    className="active"
                                    onClick={() => handlePomoType('short')}
                                >
                                    Short Break
                                </button>
                            </li>
                        ) : (
                            <button onClick={() => handlePomoType('short')}>
                                Short Break
                            </button>
                        )}
                        {mode === 'long' ? (
                            <li>
                                <button
                                    className="active"
                                    onClick={() => handlePomoType('long')}
                                >
                                    Long Break
                                </button>
                            </li>
                        ) : (
                            <button onClick={() => handlePomoType('long')}>
                                Long Break
                            </button>
                        )}
                    </ul>
                </nav>
                <div className="pomodoro fx">
                    <p className="pomodoro-minutes">
                        {formatElapsedTime(time, 'mins')}
                    </p>
                    <p className="pomodoro-colon">:</p>
                    <p className="pomodoro-seconds">
                        {formatElapsedTime(time, 'sec')}
                    </p>
                </div>
                {isRunning ? (
                    <button onClick={stop}>STOP</button>
                ) : (
                    <button onClick={start}>START</button>
                )}
            </div>
            <div className="pomo-settings fx-col-cnt">
                <h4>Settings</h4>
                <div className="inputs fx-spb-cnt">
                    <div className="input fx-cnt">
                        <p>Pomodoro</p>
                        <input
                            type="number"
                            name="pomo"
                            defaultValue={pomoTime}
                            onChange={handleNewTime}
                        />
                    </div>
                    <div className="input fx-cnt">
                        <p>Short Break</p>
                        <input
                            type="number"
                            name="short"
                            defaultValue={shortTime}
                            onChange={handleNewTime}
                        />
                    </div>
                    <div className="input fx-cnt">
                        <p>Long Break</p>
                        <input
                            type="number"
                            name="long"
                            defaultValue={longTime}
                            onChange={handleNewTime}
                        />
                    </div>
                </div>
                <button onClick={setNewTime}>SET</button>
            </div>
        </div>
    );
}

export default Pomodoro;
