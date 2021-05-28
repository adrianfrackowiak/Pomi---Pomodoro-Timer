import React, { useState } from 'react';
import '../styles/index.scss';
import Layout from '../components/layout';
import Pomodoro from '../components/app/pomodoro';
import Tasks from '../components/app/tasks';
import alert from '../sounds/alert.mp3';
import click from '../sounds/click.wav';

const IndexPage = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    return (
        <Layout darkMode={isDarkMode} setIsDarkMode={setIsDarkMode}>
            <main>
                <Pomodoro alert={alert} click={click} />
                <Tasks />
            </main>
        </Layout>
    );
};

export default IndexPage;
