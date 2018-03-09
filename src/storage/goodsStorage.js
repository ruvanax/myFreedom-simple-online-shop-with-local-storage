import {load, save} from './storage';

const KEY = 'goods';

export const loadGoods = () => {
	const goods = load(KEY, []);

	return Promise.resolve(goods);
};


const saveGoods = goods => {
	save(KEY, goods);

	return Promise.resolve(goods);
};

export const addGood = async good => {
	const goods = await loadGoods();

	good.id = goods.length ? Math.max.apply(null, goods.map(good => good.id)) + 1 : 0;
	goods.push(good);

	const savedGoods = await saveGoods(goods);

	return savedGoods;
};


export const removeGood = async goodId => {
    const goods = await loadGoods();
    const goodIndex = goods.findIndex(good => good.id === goodId);

    if (goodIndex > -1) {
        goods.splice(goodIndex, 1);
    }

    const savedGoods = await saveGoods(goods);

    return savedGoods;
};

export const editGood = async (goodId, fields) => {
    const goods = await loadGoods();
    const good = goods.find(good => good.id === goodId);

    Object.assign(good, fields);

    const savedGoods = await saveGoods(goods);

    return savedGoods;
};