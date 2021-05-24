import React from 'react';
import './index.scss';
import Layout from '../components/layout';

const IndexPage = () => {
    return (
        <Layout>
            <main className="pomo">
                <nav className="pomo-nav">
                    <ul>
                        <li>Pomodoro</li>
                        <li>Short Break</li>
                        <li>Long Break</li>
                    </ul>
                </nav>
                <div className="pomo-timer">
                    <h3>25:00</h3>
                </div>
            </main>
        </Layout>
    );
};

export default IndexPage;
