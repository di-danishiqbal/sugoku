import React, { useEffect, useState } from 'react'
import { SugouActions } from '../actions/SugokuActions';
import { SugokuGrid } from '../classes/SugokuGrid';
import { SugokuBoard } from './SugokuBoard'
import { SugokuControls } from './SugokuControls'
import { SugokuHeader } from './SugokuHeader'

const GridDifficultyLevels = {
    MEDIUM: 'medium',
    EASY: 'easy',
    HARD: 'hard'
}

export const Sugoku = () => {

    const [gridDataSet, setGridDataSet] = useState({});
    const [difficulty, setDifficulty] = useState(GridDifficultyLevels.MEDIUM);
    const [solvedStatus, setSolvedStatus] = useState('unsolved');
    const [loading, setLoading] = useState(true);
    const [gridInstance, setGridInstance] = useState(null);
    const [inProgress, setInProgress] = useState(false);


    useEffect(() => {
        initBoard();
    }, []);

    useEffect(() => {
        fetchGrid();
    }, [difficulty, gridInstance]);

    const initBoard = () => {
        const instance = new SugokuGrid();
        setGridInstance(instance);
        let gridData = instance.generateEmptyGrid();
        setGridDataSet(gridData);
    }

    const fetchGrid = async () => {
        setLoading(true);
        if (!gridInstance || !difficulty) {
            return;
        }
        let data = await SugouActions.fetchGridDataWithOptions({ difficulty: difficulty });
        let updatedGrid = gridInstance.updateGrid(data?.puzzle);
        setGridDataSet(updatedGrid);
        setSolvedStatus('unsolved');
        setLoading(false);
    }

    const solvePuzzle = async () => {
        setInProgress(true);
        let payload = gridInstance.generateGridDataToSolve();
        let data = await SugouActions.solvePuzzle(payload);
        let gridData = gridInstance.generateGridDateFrom2dArray(data.solution)
        setGridDataSet(gridData);
        setSolvedStatus(data.status);
        setInProgress(false);
    }

    const validateGrid = async () => {
        setInProgress(true);
        let payload = gridInstance.generateGridDataToSolve();
        let data = await SugouActions.validateGrid(payload);
        setSolvedStatus(data.status);
        setInProgress(false);
    }

    const changeDifficulty = (difficulty) => {
        clearGrid();
        Promise.resolve(
            (() => {
                setDifficulty('')
            })()
        ).then(() => {
            setDifficulty(difficulty)
        })
    }

    const clearGrid = () => {
        let gridData = gridInstance.clearGrid();
        setGridDataSet(gridData);
        setSolvedStatus('unsolved');
    }




    return (
        <div className="sugoku-container">
            <SugokuHeader />
            <SugokuBoard
                gridDataSet={gridDataSet}
                loading={loading}
                inProgress={inProgress}
            />
            <SugokuControls
                solvePuzzle={solvePuzzle}
                validateGrid={validateGrid}
                solvedStatus={solvedStatus}
                difficulty={difficulty}
                changeDifficulty={changeDifficulty}
                clearGrid={clearGrid}
            />
        </div>
    )
}
