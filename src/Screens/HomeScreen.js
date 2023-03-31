import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import clasicLogo from "../Media/classic.png";
import carreraLogo from "../Media/carrera.png"
import arrowLeft from "../Media/arrow_left_orange.png"
import arrowRight from "../Media/arrow_right_orange.png"
import { useNavigate } from 'react-router-dom';


function HomeScreen() {

    const game = useSelector(state => state.game)
    const navigate = useNavigate()
    const register = true
    const arrowSize = 80
    const [selected, setSelected] = useState(0)
    const modes = [
        {
            title: "Modo Clásico",
            png: clasicLogo,
            link: '/clasic'            
        },
        {
            title: "Modo Carrera",
            png: carreraLogo,
            link: '/carrera'
        }
    ]

    const handleClick = () => {
        if (selected == 1) {
            setSelected(0)
        } else {
            setSelected(1)
        }
    }

    return (
        <div className='d-flex flex-column justify-content-center' style={{ backgroundColor: 'black', width: '100vw', height: '100vh' }}>
            <div className='text-center'>
                <h1 style={{ color: 'white', fontSize: 23 }}><span style={{ color: 'orange' }}> Koshiki Game</span></h1>

                <div className='d-flex flex-row justify-content-center' style={{ margin: '0 25vw' }}>
                    <div className='col-2 col-sm-2 d-flex align-items-center justify-content-end'>
                        <img className='btn' src={arrowLeft} width={arrowSize} onClick={handleClick} />
                    </div>
                    <div className='col' style={{ backgroundColor: 'white', color: 'white', border: '1px solid orange', padding: '15px', borderRadius: '15px' }}>
                        <div className='text-center justify-content-center'>
                            <h3 style={{ color: 'black' }}>{modes[selected].title}</h3>
                            <div width={'250px'}>
                            <img src={modes[selected].png} width={'250px'} height={'250px'} />
                            </div>
                        </div>

                    </div>
                    <div className='col-2 col-sm-2 d-flex align-items-center'>
                        <img className='btn' src={arrowRight} width={arrowSize}onClick={handleClick} />
                    </div>
                </div>
                    <button onClick={()=>navigate(modes[selected].link)} className='btn' style={{backgroundColor: 'orange',border:'1px solid orange', width:'15%', marginTop: '5px', display: 'inline-block', color:'white', fontWeight: '600'}}>Enter</button>

            </div>


        </div>
    )
}

export default HomeScreen