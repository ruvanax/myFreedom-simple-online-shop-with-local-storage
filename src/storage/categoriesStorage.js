import {load, save} from './storage';

const KEY = 'categories';

export const loadCategories = () => {
	const categories = load(KEY, []);
    let catToLoad = categories.length ? categories : [{category: 'Без категории', id: 0}]
	return Promise.resolve(catToLoad);
};


const saveCategories = categories => {
	save(KEY, categories);

	return Promise.resolve(categories);
};

export const addCategory = async category => {
	const categories = await loadCategories();

	category.id = categories.length ? Math.max.apply(null, categories.map(category => category.id)) + 1 : 0;
	categories.push(category);

	const savedCategories = await saveCategories(categories);

	return savedCategories;
};


export const removeCategory = async categoryId => {
    const categories = await loadCategories();
    const categoryIndex = categories.findIndex(category => category.id === categoryId);

    if (categoryIndex > -1) {
        categories.splice(categoryIndex, 1);
    }

    const savedCategories = await saveCategories(categories);

    return savedCategories;
};

export const editCategory = async (categoryId, fields) => {
    const categories = await loadCategories();
    const category = categories.find(category => category.id === categoryId);

    Object.assign(category, fields);

    const savedCategories = await saveCategories(categories);

    return savedCategories;
};
