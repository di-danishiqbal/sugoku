export class SugokuGrid {

    initialCharKeyCode = 65;
    gridSize = 81;
    gridData = null;

    generateEmptyGrid() {
        const emptyGrid = [];

        for (const num of new Array(this.gridSize)) {
            emptyGrid.push(num);
        }

        return this.generateGrid(emptyGrid, true);
    }

    generateGrid(gridData, isEmpty) {
        let counter = 1;
        let cachedInitialCharKeyCode = this.initialCharKeyCode;
        let charCode = cachedInitialCharKeyCode;
        const gridWithData = gridData.reduce((accumulator, a, i) => {

            if (i % 9 === 9 || i % 9 === 0) {
                counter = 1;
                charCode = cachedInitialCharKeyCode++;
            } else {
                counter++;
            }

            accumulator[`${String.fromCharCode(charCode)}${counter}`] = isEmpty ? '' : a;

            return accumulator;

        }, {});

        this.gridData = gridWithData;
        return this.gridData;
    }

    updateGrid(data) {
        if (!data || typeof data !== 'object') {
            return;
        }

        for (const [key, value] of Object.entries(this.gridData)) {
            this.gridData[key] = '';
        }

        for (const [key, value] of Object.entries(data)) {
            this.gridData[key] = value;
        }
        this.gridData = { ...this.gridData }
        return this.gridData;
    }

    generateGridDataToSolve() {
        let solvePuzzleData = [];
        let currentRow = [];
        let currentRowKey = null;
        for (const [key, value] of Object.entries(this.gridData)) {
            let currentKey = key.split('')[0];
            if (currentRowKey !== currentKey) {
                if (currentRow.length) {
                    solvePuzzleData.push(currentRow);
                }
                currentRow = [];
                currentRow.push(Number(value) || 0);
                currentRowKey = currentKey;
            } else {
                currentRow.push(Number(value) || 0);
            }
        }
        if (currentRow.length) {
            solvePuzzleData.push(currentRow);
        };
        return solvePuzzleData;
    }

    generateGridDateFrom2dArray = (gridDataIn2dArray) => {
        let flatArray = [];
        for (const row of gridDataIn2dArray) {
            for (const cell of row) {
                flatArray.push(cell);
            }
        };

        return this.generateGrid(flatArray);

    }

    clearGrid = () => {
        for (const [key, value] of Object.entries(this.gridData)) {
            this.gridData[key] = '';
        }   
        this.gridData = {...this.gridData}
        return this.gridData;
    }
}