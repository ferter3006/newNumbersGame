import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    player: {
        id: 0,
        player_level: 0,
        easy_stages: 0,
        hard_stages: 0,
        user_id: 0,
        user_name: '',
        user_email: '',
        token: ''
    },
    values: {
        dimension: 4,
        results: [6, 13, 20, 7],
        operands: [
            [2, '+', 4],            // =  6
            [5, 'x', 2, '+', 3],    // = 13
            [9, 'x', 2, '+', 2],    // = 20
            [3, '+', 4],             // =  7
        ],
        operandsShuffled: []
    }
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setPlayer: (state, action) => {
            state.player = action.payload
        },
        setValues: (state, action) => {            
            state.values = action.payload
        },
        setClasicPoints: (state, action) => {            
            state.player.clasic_mode_points = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setPlayer, setValues, setClasicPoints } = gameSlice.actions

export default gameSlice.reducer