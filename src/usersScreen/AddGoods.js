import React from 'react';
import {Form, FieldTypes} from "../common/form/Form";
import {addGood, loadGoods} from '../storage/goodsStorage';
import {loadCategories} from '../storage/categoriesStorage';





export default class AddGoods extends React.Component {
	constructor(props) {
        super(props);

        this.state = {
            categories: null,
            goods: null,
            type: 'add'
        }
    }


    componentDidMount() {
        loadCategories().then(categories => {
            this.setState({
                categories
            })
        });

        loadGoods().then(goods => {
            this.setState({
                goods
            })
        });
    }



    _save(good) {
        let arr = this.state.goods.concat([]);
        let flag = false;
        arr.map((item) =>{
            if(item.good === good.good){
                flag = true;
            }
        });
        
        if(!good.good || good.good.length < 3){
            alert('Наименование должно содержать от 3 символов');
        }else if(flag){
            alert('Данное наименование уже существует');
        }else{
            addGood(good).then(console.log('успешно добавлен'));
        }
    }






    render(){
    	const fields = [{id: 'category', type: 'select'}, {id: 'good', type: 'text'}];      

        if(!this.state.categories){
            return(
                <div>...Loading</div>
            )
        }else{
            return (
                <Form 
                    fields={fields}
                    ref = {form => this.form = form}
                    categoriesObj={this.state.categories}
                    type={this.state.type}
                    onSubmit={userData => {
                                this._save(userData);
                            }}
                    />
            )
        }
    	
    }
}