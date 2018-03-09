import React from 'react';
import {Menu} from './common/menu/Menu';
import {MenuItem} from './common/menu/MenuItem';

export const MenuItemIds = {
    CATEGORIES: 'categories',
    GOODS: 'goods',
    ADDCATEGORY: 'add category',
    ADDGOOD: 'add good'
};

export const MainMenu = ({activeItemId, onActiveItemChange}) => (
    <Menu>
        <MenuItem
            isActive={activeItemId === MenuItemIds.CATEGORIES}
            onClick={() => onActiveItemChange(MenuItemIds.CATEGORIES)}
        >
            Categories
        </MenuItem>
        <MenuItem
            isActive={activeItemId === MenuItemIds.GOODS}
            onClick={() => onActiveItemChange(MenuItemIds.GOODS)}
        >
            Goods
        </MenuItem>
        <MenuItem
            isActive={activeItemId === MenuItemIds.ADDCATEGORY}
            onClick={() => onActiveItemChange(MenuItemIds.ADDCATEGORY)}
        >
            Add Category
        </MenuItem>
        <MenuItem
            isActive={activeItemId === MenuItemIds.ADDGOOD}
            onClick={() => onActiveItemChange(MenuItemIds.ADDGOOD)}
        >
            Add Good
        </MenuItem>
    </Menu>
);
