class Visualizer {
    constructor() {
        this.barsContainer = document.getElementById('bars');
    }

    renderBars(array) {
        this.barsContainer.innerHTML = '';
        array.forEach((value) => {
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = `${value}px`;
            this.barsContainer.appendChild(bar);
        });
    }

    updateBars(array, comparing = [], swapping = [], sorted = []) {
        const bars = this.barsContainer.children;
        
        // Reset all bars
        for (let i = 0; i < bars.length; i++) {
            bars[i].style.height = `${array[i]}px`;
            bars[i].className = 'bar';
            
            if (comparing.includes(i)) {
                bars[i].classList.add('comparing');
            }
            if (swapping.includes(i)) {
                bars[i].classList.add('swapping');
            }
            if (sorted.includes(i)) {
                bars[i].classList.add('sorted');
            }
        }
    }
}

export const visualizer = new Visualizer();