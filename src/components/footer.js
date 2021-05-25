import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';

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
                <ThemeToggler>
                    {({ theme, toggleTheme }) => (
                        <div>
                            {theme === 'dark' ? (
                                <p onClick={() => toggleTheme('light')}>☀️</p>
                            ) : (
                                <p onClick={() => toggleTheme('dark')}>🌙</p>
                            )}
                        </div>
                    )}
                </ThemeToggler>
            </div>
        </footer>
    );
};

export default Footer;
