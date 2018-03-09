import React from 'react';
import {Table} from '../common/table/Table';
import {DangerButton, SecondaryButton} from '../Button';
import {loadGoods, addGood, editGood, removeGood} from '../storage/goodsStorage';
import {loadCategories, addCategory, editCategory, removeCategory} from '../storage/categoriesStorage';
import {Form, FieldTypes} from "../common/form/Form";
import {PrimaryButton} from "../Button";


const FormIds = {
    TABLE: 'table',
    EDIT: 'edit'
};

export default class UsersScreenGoods extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            goods: null,
            categories: null,
            editGood: null,
            activeFormId: FormIds.TABLE,
            type: 'edit'
        }
    }

    componentDidMount() {
        loadGoods().then(goods => {
            this.setState({
                goods
            })
        });

        loadCategories().then(categories => {
            this.setState({
                categories
            })
        });
    }

    _changeForm(formId) {
        this.setState({activeFormId: formId});
    }

    _editGood(goodId){
        const goodToEdit = this.state.goods.find(good => good.id === goodId);
        this.setState({activeFormId: FormIds.EDIT, editGood: goodToEdit});
    }

    _onGoodEdit(goodId, fields){
        let arr = this.state.goods.concat([]);
        let flag = false;
        arr.map((item) =>{
            if(item.good === fields.good){
                flag = true;
            }
        });
        if(!fields.good || fields.good.length < 3){
            alert('Наименование должно содержать от 3 символов');
        }else if(flag && this.state.editGood.category === fields.category){
            alert('Совпадение наименований');
        }else{
            editGood(goodId, fields).then(goods => this.setState({activeFormId: FormIds.TABLE, goods, editGood: null}));
        }    
    }

    _removeGood(goodId){
        removeGood(goodId).then(goods => this.setState({goods}));
    }

    _save(good) {
        addGood(good).then(goods => this.setState({goods, activeFormId: FormIds.TABLE}));
    }

    render() {
        if (!this.state.goods) {
            return <div>...Loading</div>;
        }

        switch (this.state.activeFormId) {
            case FormIds.TABLE:
                return (
                    <React.Fragment>
                        <Table
                            data={this.state.goods}
                            columns={[
                                {
                                    headerComponent: () => 'ID',
                                    cellComponent: obj => obj.id,
                                    columnId: 'id'
                                },
                                {
                                    headerComponent: () => 'Good',
                                    cellComponent: obj => obj.good,
                                    columnId: 'good'
                                }, 

                                {
                                    headerComponent: () => 'Category',
                                    cellComponent: obj => obj.category,
                                    columnId: 'category'
                                },{
                                    cellComponent: obj => (
                                        <React.Fragment>
                                            <SecondaryButton onClick={() => this._editGood(obj.id)}>Edit</SecondaryButton>
                                            <DangerButton onClick={() => this._removeGood(obj.id)}>Remove</DangerButton>
                                        </React.Fragment>
                                    ),
                                    columnId: 'controls'
                                }
                            ]}/>
                    </React.Fragment>
                );

            case FormIds.EDIT:
                const fields = [{id: 'category', type: 'select', defaultValue: this.state.editGood.category}, {id: 'good', type: 'text', defaultValue: this.state.editGood.good}];
               

                if(!this.state.categories){
                    <div>...Loading</div>
                }else{
                    return (
                        <Form
                            fields={fields}
                            categoriesObj={this.state.categories}
                            type={this.state.type}
                            onCancel={() => this._changeForm(FormIds.TABLE)}
                            onSubmit={userData => {
                                this._onGoodEdit(this.state.editGood.id, userData);
                            }}
                        />
                    )
                }
        }
    }
}