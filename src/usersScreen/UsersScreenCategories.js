import React from 'react';
import {Table} from '../common/table/Table';
import {DangerButton, SecondaryButton} from '../Button';
import {loadCategories, addCategory, editCategory, removeCategory} from '../storage/categoriesStorage';
import {Form, FieldTypes} from "../common/form/Form";
import {PrimaryButton} from "../Button";


const FormIds = {
    TABLE: 'table',
    EDIT: 'edit'
};

export default class UsersScreenCategories extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: null,
            editCategory: null,
            activeFormId: FormIds.TABLE,
            type: 'edit'
        }
    }

    componentDidMount() {
        loadCategories().then(categories => {
            this.setState({
                categories
            })
        });
    }

    _changeForm(formId) {
        this.setState({activeFormId: formId});
    }

    _removeCategory(categoryId){
        removeCategory(categoryId).then(categories => this.setState({categories}));
    }

    _editCategory(categoryId){
        const categoryToEdit = this.state.categories.find(category => category.id === categoryId);
        this.setState({activeFormId: FormIds.EDIT, editCategory: categoryToEdit});
    }

    _onCategoryEdit(categoryId, fields){
        let arr = this.state.categories.concat([]);
        let flag = false;
        arr.map((item) =>{
            if(item.category === fields.category){
                flag = true;
            }
        });
        console.log(flag);
        if(!fields.category || fields.category.length < 3){
            alert('Наименование должно содержать от 3 символов');
        }else if(flag){
            alert('Данное наименование уже существует');
        }else{
            editCategory(categoryId, fields).then(categories => this.setState({activeFormId: FormIds.TABLE, categories, editCategory: null}));
        }
    }

    _save(category) {
        addCategory(category).then(categories => this.setState({categories, activeFormId: FormIds.TABLE}));
    }

    render() {
        if (!this.state.categories) {
            return <div>...Loading</div>;
        }

        switch (this.state.activeFormId) {
            case FormIds.TABLE:
                return (
                    <React.Fragment>
                        <Table
                            data={this.state.categories}
                            columns={[
                                {
                                    headerComponent: () => 'ID',
                                    cellComponent: obj => obj.id,
                                    columnId: 'id'
                                },
                                {
                                    headerComponent: () => 'Category',
                                    cellComponent: obj => obj.category,
                                    columnId: 'category'
                                }, {
                                    cellComponent: obj => (
                                        <React.Fragment>
                                            <SecondaryButton onClick={() => this._editCategory(obj.id)}>Edit</SecondaryButton>
                                            <DangerButton onClick={() => this._removeCategory(obj.id)}>Remove</DangerButton>
                                        </React.Fragment>
                                    ),
                                    columnId: 'controls'
                                }
                            ]}/>
                    </React.Fragment>
                );

            case FormIds.EDIT:
                const fields = ['category'].map((fieldname) => ({
                    id: fieldname,
                    type: FieldTypes.TEXT,
                    defaultValue: this.state.editCategory[fieldname]
                }));

                return (
                    <Form
                        fields={fields}
                        type = {this.state.type}
                        onCancel={() => this._changeForm(FormIds.TABLE)}
                        onSubmit={userData => {
                            this._onCategoryEdit(this.state.editCategory.id, userData);
                        }}
                    />
                )
        }
    }
}

