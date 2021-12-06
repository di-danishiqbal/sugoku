import React, { useEffect, useState } from 'react'

export const SugoCell = ({ cellKey, value, updateCellValue }) => {
    const [cellValue, setCellValue] = useState('')
    
    useEffect(() => {
        return () => {
            setCellValue('')
        };
    }, [cellValue]);

    const editCell = ({ target: { value: val }, id }) => {
        if (val !== '0' && val <= 9) {
            setCellValue(val);
            updateCellValue(cellKey, val);
        }

    }

    return (
        <div className="sugoku-cell" id={`container-${cellKey}`}>
            <input autoComplete="off" id={cellKey} type="text" value={value ? value : cellValue} onChange={editCell} />
        </div>
    )
}
