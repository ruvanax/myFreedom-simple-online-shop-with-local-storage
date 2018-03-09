import React from 'react';
import classnames from 'classnames';

/*
    <Button>
        <span>Send</span>
    </Button>
 */
 

export const Button = props => (
    <button {...props} type="button" className={classnames('btn', props.className)}>
        {props.children}
    </button>
);

export const PrimaryButton = props => <Button className="btn-primary" {...props} />;

export const SecondaryButton = props => <Button className="btn-secondary" {...props} />;

export const DangerButton = props => <Button className="btn-danger" {...props} />;
