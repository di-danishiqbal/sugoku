import React from 'react'


const generateOptions = [
    'Easy',
    'Medium',
    'Hard',
    'Random',
    'Clear'
]

export const SugokuControls = ({
    changeDifficulty,
    difficulty,
    solvedStatus,
    solvePuzzle,
    validateGrid,
    clearGrid }) => {

    const renderGenerateOptions = () => {
        return (
            <div className="sugoku-generate">
                <span id="generate">Generate: </span>
                {
                    generateOptions.map(genOp => {
                        return (
                            <button onClick={() => {
                                if (genOp === 'Clear') {
                                    clearGrid()
                                } else {
                                    changeDifficulty(genOp.toLowerCase())
                                }
                            }
                            }>{genOp}</button>
                        )
                    })
                }
            </div>
        )
    }

    const renderStatus = () => {
        return (
            <div className="sugoku-status-container">
                <div className="sugoku-status">
                    <div className="sugoku-status-btn">
                        <i class={`material-icons ${solvedStatus === 'solved' ? 'solved-icon' : 'unsolved-icon'}`}>check</i>
                        <button onClick={validateGrid}>
                            Validate
                        </button>
                    </div>
                    <div className="sugoku-status-btn">
                        <button>{solvedStatus}</button>
                    </div>
                </div>
                <div className="sugoku-status">
                    <div className="sugoku-status-btn">
                        <button>Difficulty</button>
                    </div>
                    <div className="sugoku-status-btn">
                        <button>{difficulty}</button>
                    </div>
                </div>
            </div>
        )
    }

    const renderSolveButton = () => {
        return (
            <div className="sugoku-solve">
                <button onClick={solvePuzzle}>Solve</button>
            </div>
        )
    }

    return (
        <div className="sugoku-footer">
            {
                renderGenerateOptions()
            }
            {
                renderStatus()
            }
            {
                renderSolveButton()
            }
        </div>
    )
}
