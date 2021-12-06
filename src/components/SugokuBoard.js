import React from 'react'
import { SugoCell } from './SugoCell'

export const SugokuBoard = ({ gridDataSet, loading, inProgress, updateCellValue }) => {


    const generateGrid = () => {

        return Object.entries(gridDataSet).map(([key, value]) => {
            return <SugoCell cellKey={key} value={value} updateCellValue={updateCellValue}/>

        })
    }

    const generateBoardLayout = () => {
        const layoutItems = [];
        for (let i = 0; i < 9; i++) {
            layoutItems.push(<div className="sugoku-board-layout-item">
                {loading ? <i class="material-icons icons-outlined">
                    loop
                </i> : ''}
            </div>)
        }
        return layoutItems;
    }

    return (
        <div className="sugoku-board-container">
            <div className="sugoku-board-layout">
                {generateBoardLayout()}
            </div>
            <div className="sugoku-board">
                {generateGrid()}
            </div>
            {inProgress ? <div className="progress"></div> : ''}
        </div>
    )
}
