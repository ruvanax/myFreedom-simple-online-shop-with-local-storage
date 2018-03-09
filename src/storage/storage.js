export const load = (key, defaultValue) => {
    const item = localStorage.getItem(key);

    if (!item) {
        return defaultValue;
    }

    return JSON.parse(item);
};

export const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));
