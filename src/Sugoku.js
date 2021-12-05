import React, { useEffect, useState } from 'react'
import { SugokuBoard } from './SugokuBoard'
import { SugokuControls } from './SugokuControls'
import { SugokuHeader } from './SugokuHeader'

let initialCharKeyCode = 65;
const gridSize = 81; // 9 x 9

const GridDifficultyLevels = {
    MEDIUM: 'medium',
    EASY: 'easy',
    HARD: 'hard'
}

export const Sugoku = () => {

    const [gridDataSet, setGridDataSet] = useState({});
    const [difficulty, setDifficulty] = useState(GridDifficultyLevels.MEDIUM);
    const [solvedStatus, setSolvedStatus] = useState('unsolved');
    const [shouldReFetch, setShouldReFetch] = useState(true);


    useEffect(() => {
        generateEmptyGrid();
    }, []);

    useEffect(() => {
        if (!difficulty) {
            return;
        }
        fetchGridDataWithOptions({ difficulty: difficulty });
        setSolvedStatus('unsolved');
    }, [difficulty, shouldReFetch]);

    const fetchGridData = async (options) => {
        let url = `https://vast-chamber-17969.herokuapp.com/generate?${options}`;
        let res = await fetch(url);
        let data = await res.json();
        updateGrid(data?.puzzle);
    }

    const fetchGridDataWithOptions = (options) => {
        let queryParams = '';
        for (const [key, value] of Object.entries(options)) {
            queryParams = !queryParams ? `${key}=${value}` : `${queryParams}&${key}=${value}`;
        }
        fetchGridData(queryParams);
    }

    const updateGrid = (data) => {
        if (!data || typeof data !== 'object') {
            return;
        }
        setGridDataSet(pre => {

            for (const [key, value] of Object.entries(pre)) {
                pre[key] = '';
            }

            for (const [key, value] of Object.entries(data)) {
                pre[key] = value;
            }
            return { ...pre };
        });
    }

    const generateEmptyGrid = () => {
        const emptyGrid = [];

        for (const num of new Array(gridSize)) {
            emptyGrid.push(num);
        }

        createGridWithData(emptyGrid, true)
    }

    const createGridWithData = (gridData, isEmpty) => {
        let counter = 1;
        let cachedInitialCharKeyCode = initialCharKeyCode;
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

        setGridDataSet(gridWithData);
    }

    const regenerateGrid = (difficulty) => {

        Promise.resolve(
            (() => {
                if (difficulty === 'random') {
                    setDifficulty('')
                }
            })()
        ).then(() => {
            setDifficulty(difficulty)
        })
    }

    const generateGridDataToSolve = () => {
        let solvePuzzleData = [];
        let currentRow = [];
        let currentRowKey = null;
        for (const [key, value] of Object.entries(gridDataSet)) {
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

    const generateGridDateFrom2dArray = (gridDataIn2dArray) => {
        let flatArray = [];
        for (const row of gridDataIn2dArray) {
            for (const cell of row) {
                flatArray.push(cell);
            }
        };

        createGridWithData(flatArray);

    }

    const postGrid = async (url) => {
        let payload = generateGridDataToSolve();
        const formData = new FormData();
        formData.append('board', JSON.stringify(payload))
        const res = await fetch(url, {
            method: 'post',
            body: formData
        });
        return await res.json();

    }

    const solvePuzzle = async () => {
        const url = 'https://sugoku.herokuapp.com/solve';
        const data = await postGrid(url);
        generateGridDateFrom2dArray(data.solution)
        setSolvedStatus(data.status);
    }

    const validateGrid = async () => {
        const url = 'https://sugoku.herokuapp.com/validate';
        const data = await postGrid(url);
        setSolvedStatus(data.status);

    }

    const clearGrid = () => {
        setGridDataSet(pre => {
            for (const [key, value] of Object.entries(pre)) {
                pre[key] = '';
            }
            return { ...pre };
        });
        setSolvedStatus('unsolved');
        setShouldReFetch(!shouldReFetch)
    }


    return (
        <div className="sugoku-container">
            <SugokuHeader />
            <SugokuBoard
                gridDataSet={gridDataSet}
            />
            <SugokuControls
                solvePuzzle={solvePuzzle}
                validateGrid={validateGrid}
                solvedStatus={solvedStatus}
                difficulty={difficulty}
                regenerateGrid={regenerateGrid}
                clearGrid={clearGrid}
            />
        </div>
    )
}
