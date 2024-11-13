import { visualizer } from './visualizer.js';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const bubbleSort = async (array, delay, state) => {
    const n = array.length;
    const sorted = [];

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (!state.isSorting) throw new Error('Sorting stopped');

            visualizer.updateBars(array, [j, j + 1], [], sorted);
            await sleep(delay);

            if (array[j] > array[j + 1]) {
                visualizer.updateBars(array, [], [j, j + 1], sorted);
                await sleep(delay);

                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
        }
        sorted.unshift(n - i - 1);
    }
    sorted.unshift(0);
    visualizer.updateBars(array, [], [], sorted);
};

export const quickSort = async (array, low, high, delay, state) => {
    if (low < high && state.isSorting) {
        const pivot = array[high];
        let i = low - 1;

        visualizer.updateBars(array, [], [high]);
        await sleep(delay);

        for (let j = low; j < high; j++) {
            if (!state.isSorting) throw new Error('Sorting stopped');

            visualizer.updateBars(array, [j], [high]);
            await sleep(delay);

            if (array[j] < pivot) {
                i++;
                visualizer.updateBars(array, [], [i, j]);
                await sleep(delay);

                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        visualizer.updateBars(array, [], [i + 1, high]);
        await sleep(delay);

        [array[i + 1], array[high]] = [array[high], array[i + 1]];

        const pi = i + 1;

        await quickSort(array, low, pi - 1, delay, state);
        await quickSort(array, pi + 1, high, delay, state);
    }
};

export const mergeSort = async (array, left, right, delay, state) => {
    if (left < right && state.isSorting) {
        const mid = Math.floor((left + right) / 2);

        await mergeSort(array, left, mid, delay, state);
        await mergeSort(array, mid + 1, right, delay, state);

        await merge(array, left, mid, right, delay, state);
    }
};

const merge = async (array, left, mid, right, delay, state) => {
    const n1 = mid - left + 1;
    const n2 = right - mid;
    const L = array.slice(left, mid + 1);
    const R = array.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
        if (!state.isSorting) throw new Error('Sorting stopped');

        visualizer.updateBars(array, [left + i, mid + 1 + j]);
        await sleep(delay);

        if (L[i] <= R[j]) {
            array[k] = L[i];
            i++;
        } else {
            array[k] = R[j];
            j++;
        }
        k++;
    }

    while (i < n1) {
        if (!state.isSorting) throw new Error('Sorting stopped');
        array[k] = L[i];
        i++;
        k++;
        visualizer.updateBars(array, [k]);
        await sleep(delay);
    }

    while (j < n2) {
        if (!state.isSorting) throw new Error('Sorting stopped');
        array[k] = R[j];
        j++;
        k++;
        visualizer.updateBars(array, [k]);
        await sleep(delay);
    }
};

export const insertionSort = async (array, delay, state) => {
    const n = array.length;
    const sorted = [0];

    for (let i = 1; i < n; i++) {
        if (!state.isSorting) throw new Error('Sorting stopped');

        let key = array[i];
        let j = i - 1;

        visualizer.updateBars(array, [i], [], sorted);
        await sleep(delay);

        while (j >= 0 && array[j] > key) {
            if (!state.isSorting) throw new Error('Sorting stopped');

            visualizer.updateBars(array, [], [j, j + 1], sorted);
            await sleep(delay);

            array[j + 1] = array[j];
            j--;
        }

        array[j + 1] = key;
        sorted.push(i);
    }

    visualizer.updateBars(array, [], [], sorted);
};