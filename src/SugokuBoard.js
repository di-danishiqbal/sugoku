import React, {
    useEffect,
    useState
} from 'react'

export const SugokuBoard = ({ gridDataSet }) => {


    const generateGrid = () => {

        return Object.entries(gridDataSet).map(([key, value]) => {
            return <div className="sugoku-cell" id={key}><span>{value}</span></div>

        })
    }

    return (
        <div className="sugoku-board">
            {generateGrid()}
        </div>
    )
}
