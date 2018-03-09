import React from 'react';
import PropTypes from 'prop-types';
import {Button, PrimaryButton} from '../../Button';

export const FieldTypes = {
    TEXT: 'text',
    NUMERIC: 'numeric',
    SELECT: 'select'
};

const TextInput = props => <input {...props} type="text" onChange={evt => props.onChange(evt.target.value)} required/>;
const NumericInput = props => <input {...props} type="number" onChange={evt => props.onChange(evt.target.value)} required/>;



const SelectTag = props =>{
    let categories = props.categoriesobj;
    let options = categories.map((item, index) =>{
        return(
            <option key={index} defaultValue={item.category}>{item.category}</option>
        )
    });
    return(
        <select {...props} onChange={evt => props.onChange(evt.target.value)}>
            {options}
        </select>
    ) 
} 


const FormToRend = ({type, ...others}) => {
    let Component;
    switch (type) {
        case FieldTypes.TEXT:
            Component = TextInput;
            break;
        case FieldTypes.NUMERIC:
            Component = NumericInput;
            break;
        case FieldTypes.SELECT:
            Component = SelectTag;
            break;
        default:
            throw new Error(`Unknown field type '${type}'.`);
    }

    return <Component {...others} />;
};


export class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = props.fields.reduce((acc, field) => {
            acc[field.id] = field.defaultValue || '';
            return acc;
        }, {});
    }


    componentWillMount(){
        if(!this.state.category && this.props.categoriesObj){
            this.setState({category: this.props.categoriesObj[0].category});
        }
    }

    _successfulChange(){
        for (let i in this.state){
            this.setState({[i]: ''});
        }
    }


    render() {

        switch(this.props.type){
            case 'add':
                return (
                    <div>
                        {this.props.fields.map(({type, id}, index) =>
                            <FormToRend
                                key={index}
                                type={type}
                                categoriesobj={this.props.categoriesObj}
                                value={this.state[id]}
                                onChange={value => this.setState({[id]: value})}
                            />
                        )}
                        <PrimaryButton onClick={() => {this.props.onSubmit(this.state); 
                                                        this._successfulChange()}}>Save</PrimaryButton>
                    </div>
                    );
                

            case 'edit':
                return (
                    <div>
                        {this.props.fields.map(({type, id}, index) =>
                            <FormToRend
                                key={index}
                                type={type}
                                categoriesobj={this.props.categoriesObj}
                                value={this.state[id]}
                                onChange={value => this.setState({[id]: value})}
                            />
                        )}
                        <Button onClick={() => this.props.onCancel()}>Cancel</Button>
                        <PrimaryButton onClick={() => this.props.onSubmit(this.state)}>Save</PrimaryButton>
                    </div>
                );
                       
        }

        
    }
}

Form.propTypes = {
    fields: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })).isRequired,
    onSubmit: PropTypes.func.isRequired
};

