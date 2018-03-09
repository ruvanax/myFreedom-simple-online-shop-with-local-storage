import React from 'react';

export const Menu = ({children}) => (
    <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
        <ul className="navbar-nav mr-auto">
            {children}
        </ul>
    </nav>
);
