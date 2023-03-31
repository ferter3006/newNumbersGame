import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Grid from './Grid'

function Board({ size, handleWin }) {

    const dimension = useSelector(state => state.game.values.dimension)

    return (
        <div style={{ backgroundColor: 'black' }}>
            <Grid size={size} dimension={dimension} handleWin={handleWin} />
        </div>
    )
}

export default Board