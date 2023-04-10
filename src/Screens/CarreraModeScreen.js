import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Board from '../Components/Board'
import { creadorAleatorioDeValores } from '../Funcionalidades/CreadorRandom'
import { setValues } from '../Redux/gameSlice'
import backIcon from "../Media/back.png"
import { useNavigate } from 'react-router-dom'

function CarreraModeScreen({ boardSize }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const player = useSelector(state => state.game.player)
    const [play, setPlay] = useState(false)

    // useEffect(() => {
    //     let creacionRandom = creadorAleatorioDeValores(4, 2, 3, false)
    //     dispatch(setValues(creacionRandom))
    // }, [])

    const handleBack = () => {
        navigate('/home')
    }

    const handleClick = (x) => {
        console.log(player.modo_carrera_level);
        let creacionRandom = creadorAleatorioDeValores(4, player.modo_carrera_level-2, player.modo_carrera_level-1, false, true)
        dispatch(setValues(creacionRandom))
        setPlay(true)
    }

    return (
        <div className='d-flex justify-content-center' style={{ backgroundColor: 'black', height: play ? '' : '100vh' }}>
            <div className="d-flex flex-column text-center">
                <h3 style={{ color: 'orange', fontWeight: '700' }}>Modo Carrera</h3>
                <img onClick={handleBack} className='btn btn-dark' src={backIcon} width={'60px'} style={{ position: 'absolute', top: '15px' }} />
                <h5 style={{ color: 'white' }}><span style={spanStyle}>Points: </span>{player.clasic_mode_points} <span style={spanStyle}>World Position: </span>{player.classicWorldPosition}</h5>
                {play ? <Board size={boardSize} />
                    :
                    <div className='d-flex flex-column p-2 justify-content-center' style={{ backgroundColor: 'white', width: boardSize, height: boardSize }}>
                        <div className="row mt-2">
                            {/* <ClasicButton title={'Limited'} icon={grid2x2} color={'lightgreen'} handleclick={handleClick} /> */}
                            {/* <ClasicButton title={'Unlimited'} icon={grid3x3} color={'lightblue'} handleclick={handleClick} /> */}
                            
                            <h4>Proximamente</h4>

                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

const spanStyle = { color: 'gray', fontSize: '16px' }

export default CarreraModeScreen