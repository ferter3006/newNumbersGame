import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Board from '../Components/Board'
import ClasicButton from '../Components/ClasicButton'
import { creadorAleatorioDeValores } from '../Funcionalidades/CreadorRandom'
import { setClasicPoints, setValues } from '../Redux/gameSlice'
import grid2x2 from "../Media/2x2.png"
import grid3x3 from "../Media/3x3.png"
import grid4x4 from "../Media/4x4.png"
import grid5x5 from "../Media/5x5.png"
import backIcon from "../Media/back.png"
import easyIcon from "../Media/easy.png"
import hardIcon from "../Media/hard.png"
import { useNavigate } from 'react-router-dom'
import { API_ENDPOINT_INCREMENT } from '../Api'

// boardSize es el tamany de pixels no de cuadres!
function ClassicGameScreen({ boardSize }) {

    const player = useSelector(state => state.game.player)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [play, setPlay] = useState(false)
    const costs = [4, 90, 1600, 25000]
    const rewards = [8, 180, 2000, 30000]
    const hardRewards = [8, 200, 3000, 40000]
    const [reward, setReward] = useState(0);
    const [mode, setMode] = useState(0)
    const modeIcon = [easyIcon, hardIcon]


    const handleChangeMode = () => {
        setMode(prev => prev === 0 ? 1 : 0)
    }

    const handleClick = (x) => {
        if (player.clasic_mode_points < costs[x - 2]) {
            if (x !== 2) {
                alert('No tienes suficientes puntos para entrar aquí aún')
                return
            }
        }

        // Fetch per restar punts (pagar entrada)
        fetch(API_ENDPOINT_INCREMENT, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${player.token}`,
                'Content-Type': 'applicaton/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                reward: -costs[x - 2]
            })
        })
            .then(response => response.json())
            .then(JsonResponse => {
                if (JsonResponse.status === 1) {
                    // Si servidor respon be, comença el joc
                    dispatch(setClasicPoints(JsonResponse.player.clasic_mode_points))   // Actualizem puntuació a redux
                    setReward(rewards[x - 2])                                           // Posem reward al valor que toca (per despres guanyar punts)
                    let creacionRandom;
                    if (mode === 0) {
                        // modo facil
                        creacionRandom = creadorAleatorioDeValores(x, 0, 45, false)    // Creem el tablero segons ens interesa
                    } else {
                        // modo dificil
                        creacionRandom = creadorAleatorioDeValores(x, -99, 99, true)    // Creem el tablero segons ens interesa
                    }
                    dispatch(setValues(creacionRandom))                                 // Posem a redux la creació del board que acabm de fer
                    setPlay(true)                                                       // Posem play = true per arrancar el joc (mostrar div)
                } else {
                    alert("Error de Servidor")
                }
            })
    }

    const handleBack = () => {
        if (play) {
            setPlay(false)
        } else {
            navigate('/home')
        }
    }

    const handleWin = () => {

        setPlay(false)
        fetch(API_ENDPOINT_INCREMENT, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${player.token}`,
                'Content-Type': 'applicaton/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                reward: reward
            })
        })
            .then(response => response.json())
            .then(JsonResponse => {
                if (JsonResponse.status === 1) {
                    dispatch(setClasicPoints(JsonResponse.player.clasic_mode_points))   // Actualizem puntuació a redux
                } else {
                    alert("Error grave de Servidor")
                }
            })
    }

    return (
        <div className='d-flex justify-content-center' style={{ backgroundColor: 'black', height: play ? '' : '100vh' }}>
            <div className="d-flex flex-column text-center">
                <h3 style={{ color: 'orange', fontWeight: '700' }}>Classic Mode</h3>
                <img onClick={handleBack} className='btn btn-dark' src={backIcon} width={'60px'} style={{ position: 'absolute', top: '15px' }} />
                <h5 style={{ color: 'white' }}><span style={spanStyle}>Points: </span>{player.clasic_mode_points} <span style={spanStyle}>World Position: </span>{player.classicWorldPosition}</h5>
                {play ? <Board size={boardSize} handleWin={handleWin} />
                    :
                    <div className='d-flex flex-column p-2 justify-content-center' style={{ backgroundColor: 'white', width: boardSize, height: boardSize }}>
                        <img onClick={handleChangeMode} src={modeIcon[mode]} width='80px' className='btn' style={{ position: 'absolute', top: '80px' }} />

                        <div className="row mt-2">
                            <ClasicButton title={2} cost={costs[0]} win={mode === 0 ? rewards[0] : hardRewards[0]} icon={grid2x2} color={'lightgreen'} handleclick={handleClick} />
                            <ClasicButton title={3} cost={costs[1]} win={mode === 0 ? rewards[1] : hardRewards[1]} icon={grid3x3} color={'lightblue'} handleclick={handleClick} />
                        </div>
                        <div className="row mt-2">
                            <ClasicButton title={4} cost={costs[2]} win={mode === 0 ? rewards[2] : hardRewards[2]} icon={grid4x4} color={'violet'} handleclick={handleClick} />
                            <ClasicButton title={5} cost={costs[3]} win={mode === 0 ? rewards[3] : hardRewards[3]} icon={grid5x5} color={'tomato'} handleclick={handleClick} />
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

const spanStyle = { color: 'gray', fontSize: '16px' }

export default ClassicGameScreen