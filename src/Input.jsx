import React from 'react';

export class Input extends React.Component {
    constructor(props) {
        super(props);

        console.log('constructor');

        this.state = {
            text: props.text || ''
        };

        this._domElement = null;
    }

    onChange = evt => {
        this.setState({text: evt.target.value});
        this.props.onChange(evt.target.value);
    };

    componentWillReceiveProps(nextProps) {
        this.setState({text: nextProps.text});
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.text !== this.state.text;
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    render() {
        return (
            <input
                ref={domElement => {
                    this._domElement = domElement;
                    this.props.autoFocus && domElement.focus();
                }}
                value={this.state.text}
                onChange={this.onChange}
            />
        )
    }
}
