import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Settings2 } from 'lucide-react';

interface Bar {
  height: number;
  isComparing: boolean;
  isSwapping: boolean;
}

const ANIMATION_SPEED_MS = 50;
const DEFAULT_ARRAY_SIZE = 50;

function SortingVisualizer() {
  const [array, setArray] = useState<Bar[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble');
  const [arraySize, setArraySize] = useState(DEFAULT_ARRAY_SIZE);

  const generateRandomArray = useCallback(() => {
    const newArray: Bar[] = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push({
        height: Math.floor(Math.random() * 500) + 50,
        isComparing: false,
        isSwapping: false,
      });
    }
    setArray(newArray);
  }, [arraySize]);

  useEffect(() => {
    generateRandomArray();
  }, [generateRandomArray]);

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const bubbleSort = async () => {
    const arr = [...array];
    let swapped;
    
    do {
      swapped = false;
      for (let i = 0; i < arr.length - 1; i++) {
        if (!isSorting) return;
        
        arr[i] = { ...arr[i], isComparing: true };
        arr[i + 1] = { ...arr[i + 1], isComparing: true };
        setArray([...arr]);
        
        await sleep(ANIMATION_SPEED_MS);
        
        if (arr[i].height > arr[i + 1].height) {
          arr[i] = { ...arr[i], isSwapping: true };
          arr[i + 1] = { ...arr[i + 1], isSwapping: true };
          setArray([...arr]);
          
          await sleep(ANIMATION_SPEED_MS);
          
          const temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
          swapped = true;
        }
        
        arr[i] = { ...arr[i], isComparing: false, isSwapping: false };
        arr[i + 1] = { ...arr[i + 1], isComparing: false, isSwapping: false };
        setArray([...arr]);
      }
    } while (swapped);
    
    setIsSorting(false);
  };

  const quickSort = async () => {
    const arr = [...array];
    
    const partition = async (low: number, high: number) => {
      const pivot = arr[high].height;
      let i = low - 1;
      
      for (let j = low; j < high; j++) {
        if (!isSorting) return;
        
        arr[j] = { ...arr[j], isComparing: true };
        setArray([...arr]);
        await sleep(ANIMATION_SPEED_MS);
        
        if (arr[j].height < pivot) {
          i++;
          arr[i] = { ...arr[i], isSwapping: true };
          arr[j] = { ...arr[j], isSwapping: true };
          setArray([...arr]);
          await sleep(ANIMATION_SPEED_MS);
          
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
        }
        
        arr[j] = { ...arr[j], isComparing: false, isSwapping: false };
        if (i >= 0) arr[i] = { ...arr[i], isSwapping: false };
        setArray([...arr]);
      }
      
      arr[i + 1] = { ...arr[i + 1], isSwapping: true };
      arr[high] = { ...arr[high], isSwapping: true };
      setArray([...arr]);
      await sleep(ANIMATION_SPEED_MS);
      
      const temp = arr[i + 1];
      arr[i + 1] = arr[high];
      arr[high] = temp;
      
      arr[i + 1] = { ...arr[i + 1], isSwapping: false };
      arr[high] = { ...arr[high], isSwapping: false };
      setArray([...arr]);
      
      return i + 1;
    };
    
    const sort = async (low: number, high: number) => {
      if (low < high && isSorting) {
        const pi = await partition(low, high);
        await sort(low, pi - 1);
        await sort(pi + 1, high);
      }
    };
    
    await sort(0, arr.length - 1);
    setIsSorting(false);
  };

  const startSorting = async () => {
    setIsSorting(true);
    if (selectedAlgorithm === 'bubble') {
      await bubbleSort();
    } else if (selectedAlgorithm === 'quick') {
      await quickSort();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Sorting Visualizer
          </h1>
          
          <div className="flex gap-4 mb-6">
            <button
              onClick={generateRandomArray}
              disabled={isSorting}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <RotateCcw size={18} />
              Generate New Array
            </button>
            
            <button
              onClick={isSorting ? () => setIsSorting(false) : startSorting}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
            >
              {isSorting ? <Pause size={18} /> : <Play size={18} />}
              {isSorting ? 'Stop' : 'Start'} Sorting
            </button>
            
            <select
              value={selectedAlgorithm}
              onChange={(e) => setSelectedAlgorithm(e.target.value)}
              disabled={isSorting}
              className="px-4 py-2 bg-gray-700 rounded-lg text-white"
            >
              <option value="bubble">Bubble Sort</option>
              <option value="quick">Quick Sort</option>
            </select>
            
            <div className="flex items-center gap-2">
              <Settings2 size={18} />
              <input
                type="range"
                min="10"
                max="100"
                value={arraySize}
                onChange={(e) => setArraySize(Number(e.target.value))}
                disabled={isSorting}
                className="w-32"
              />
              <span className="text-sm">{arraySize} items</span>
            </div>
          </div>
        </div>

        <div className="relative h-[500px] bg-gray-800 rounded-lg p-4 flex items-end justify-center gap-1">
          {array.map((bar, idx) => (
            <div
              key={idx}
              style={{ height: `${bar.height / 6}%` }}
              className={`w-full transition-all duration-100 rounded-t-sm ${
                bar.isSwapping
                  ? 'bg-red-500'
                  : bar.isComparing
                  ? 'bg-yellow-400'
                  : 'bg-blue-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SortingVisualizer;