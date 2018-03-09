import React from 'react';
import classnames from 'classnames';

export const MenuItem = ({onClick, isActive, children}) => (
    <li onClick={onClick} className={classnames('nav-item', {
        'active': isActive
    })}>
        <a className="nav-link" href="#">{children}</a>
    </li>
);
