import React from 'react';
import {Form, FieldTypes} from "../common/form/Form";
import {addCategory, loadCategories} from '../storage/categoriesStorage';





export default class AddCategories extends React.Component {
	constructor(props) {
        super(props);

        this.state = {
            categories: null,
            type: 'add'
        }
    }


    componentDidMount() {
        loadCategories().then(categories => {
            this.setState({
                categories
            })
        });
    }


    _save(category) {
        let arr = this.state.categories.concat([]);
        let flag = false;
        arr.map((item) =>{
            if(item.category === category.category){
                flag = true;
            }
        });
        
        if(!category.category || category.category.length < 3){
            alert('Наименование должно содержать от 3 символов');
        }else if(flag){
            alert('Данное наименование уже существует');
        }else{
            addCategory(category).then(console.log('успешно добавлена'));
        }
    }






    render(){
    	const fields = ['category'].map((id) => ({
            id,
            type: FieldTypes.TEXT
        }));


    	return (
            <Form
                fields={fields}
                type={this.state.type}
                onSubmit={userData => {
                            this._save(userData);
                        }}
            	/>
        )
    }
}