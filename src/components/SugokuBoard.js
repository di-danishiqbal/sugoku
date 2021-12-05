import React from 'react'

export const SugokuBoard = ({ gridDataSet, loading, inProgress }) => {

    const generateGrid = () => {

        return Object.entries(gridDataSet).map(([key, value]) => {
            return <div className="sugoku-cell" id={key}><span>{value}</span></div>

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
