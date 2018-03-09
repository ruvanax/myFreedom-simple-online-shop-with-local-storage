import React from 'react';
import {Table} from './common/table/Table';
import {Form, FieldTypes} from './common/form/Form';
import {MainMenu, MenuItemIds} from './MainMenu';
import UsersScreenCategories from "./usersScreen/UsersScreenCategories";
import UsersScreenGoods from "./usersScreen/UserScreenGoods";
import AddCategories from "./usersScreen/AddCategories";
import AddGoods from "./usersScreen/AddGoods";


const RenderScreen = props => {
    switch (props.activeScreenId) {
        case MenuItemIds.CATEGORIES:
            return <UsersScreenCategories />;

        case MenuItemIds.GOODS:
            return <UsersScreenGoods />;

        case MenuItemIds.ADDCATEGORY:
            return <AddCategories/>;

        case MenuItemIds.ADDGOOD:
            return <AddGoods />;
    }
};


export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeItemId: MenuItemIds.CATEGORIES
        };
    }

    render() {
        return (
            <div className="container">
                <MainMenu
                    activeItemId={this.state.activeItemId}
                    onActiveItemChange={id => this.setState({
                        activeItemId: id
                    })}/>

                <RenderScreen activeScreenId = {this.state.activeItemId} />
            </div>
        );
    }
}
