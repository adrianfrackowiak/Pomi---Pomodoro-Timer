import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

const Footer = ({ darkMode, setIsDarkMode }) => {
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    author
                }
            }
        }
    `);

    return (
        <footer>
            <p>created by {data.site.siteMetadata.author}</p>
            <div className="icons">
                <p>🌧️</p>
                {darkMode ? (
                    <p onClick={() => setIsDarkMode(false)}>🌙</p>
                ) : (
                    <p onClick={() => setIsDarkMode(true)}>☀️</p>
                )}
            </div>
        </footer>
    );
};

export default Footer;
