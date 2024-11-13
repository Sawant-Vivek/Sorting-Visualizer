import { generateArray } from './arrayGenerator.js';
import { bubbleSort, quickSort, mergeSort, insertionSort } from './sortingAlgorithms.js';
import { visualizer } from './visualizer.js';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const state = {
        array: [],
        isSorting: false,
        arraySize: 50,
        speed: 50
    };

    // DOM Elements
    const generateArrayBtn = document.getElementById('generateArray');
    const startSortBtn = document.getElementById('startSort');
    const algorithmSelect = document.getElementById('algorithm');
    const arraySizeInput = document.getElementById('arraySize');
    const speedInput = document.getElementById('speed');
    const arraySizeValue = document.getElementById('arraySizeValue');
    const speedValue = document.getElementById('speedValue');

    // Initialize array
    state.array = generateArray(state.arraySize);
    visualizer.renderBars(state.array);

    // Event Listeners
    generateArrayBtn.addEventListener('click', () => {
        if (!state.isSorting) {
            state.array = generateArray(state.arraySize);
            visualizer.renderBars(state.array);
        }
    });

    startSortBtn.addEventListener('click', async () => {
        if (state.isSorting) {
            state.isSorting = false;
            startSortBtn.textContent = 'Start Sorting';
            return;
        }

        state.isSorting = true;
        startSortBtn.textContent = 'Stop Sorting';
        generateArrayBtn.disabled = true;
        algorithmSelect.disabled = true;
        arraySizeInput.disabled = true;

        const algorithm = algorithmSelect.value;
        const delay = 101 - state.speed;

        try {
            switch (algorithm) {
                case 'bubble':
                    await bubbleSort(state.array, delay, state);
                    break;
                case 'quick':
                    await quickSort(state.array, 0, state.array.length - 1, delay, state);
                    break;
                case 'merge':
                    await mergeSort(state.array, 0, state.array.length - 1, delay, state);
                    break;
                case 'insertion':
                    await insertionSort(state.array, delay, state);
                    break;
            }
        } catch (error) {
            console.log('Sorting stopped');
        }

        state.isSorting = false;
        startSortBtn.textContent = 'Start Sorting';
        generateArrayBtn.disabled = false;
        algorithmSelect.disabled = false;
        arraySizeInput.disabled = false;
    });

    arraySizeInput.addEventListener('input', (e) => {
        if (!state.isSorting) {
            state.arraySize = parseInt(e.target.value);
            arraySizeValue.textContent = state.arraySize;
            state.array = generateArray(state.arraySize);
            visualizer.renderBars(state.array);
        }
    });

    speedInput.addEventListener('input', (e) => {
        state.speed = parseInt(e.target.value);
        speedValue.textContent = state.speed;
    });
});