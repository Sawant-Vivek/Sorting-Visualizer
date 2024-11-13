export const generateArray = (size) => {
    const array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 300) + 50);
    }
    return array;
};