import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { colorInicial, colors } from '../Config/Colors';
import cuadroPNG from '../Media/frame.png'
import squarePNG from '../Media/square.png'

function Grid({ size, dimension, handleWin }) {

    const values = useSelector(state => state.game.values)
    const navigate = useNavigate()

    const squareSize = (size / dimension)
    const arrayBuid = [...Array(dimension)]                 // pel map() dins del render
    const operandsJunts = values.operandsShuffled            // tots en un array per mostrar facil ( i remenats)
    const [operandColors, setOperandColors] = useState([])  // useeffect omple aixo al montar comp
    const [operandOwners, setOperandOwners] = useState({})  // useeffect omple aixo. Un array per cada result
    const [operandResults, setOperandResults] = useState([])// results actuals segons seleccionats
    const [selected, setSelected] = useState(0)             // al render hi ha un onclick={()=>setSelected(*)}    

    useEffect(() => {
        // segons dimensió => creem tants operands com toca (dimensio al cuadrat)        
        for (let index = 0; index < Math.pow(dimension, 2); index++) {
            setOperandColors(prev => [...prev, colorInicial])
        }

        // Creem un objeto dinamic amb {0: [], 1: [] ...} per cada result
        let helper = {}
        for (let index = 0; index < values.results.length; index++) {
            helper = { ...helper, [index]: [] }
        }
        setOperandOwners(helper)

        // Creem array amb tants zeros com results
        let tempArray = []
        for (let i = 0; i < values.results.length; i++) {
            tempArray.push(0)
        }
        setOperandResults(tempArray)
    }, [dimension])


    // Cambia color square operand segons selector actiu (si ja te owner => será neutre)    
    const changeColor = (x) => {
        let result = operandColors.map((c, i) => {
            if (x === i) {
                if (c === colorInicial) {
                    return colors[selected]
                } else {
                    return colorInicial
                }
            } else {
                return c
            }
        })
        setOperandColors(result)
    }

    // Cambia owner. Si ja te, primer pasará a ser de ningu (por que me da la gana)
    const changeOwner = (x) => {
        let encontrado = false;
        Object.keys(operandOwners).forEach(selector => {
            if (operandOwners[selector].includes(x)) {
                setOperandOwners({
                    ...operandOwners,
                    [selector]: [...operandOwners[selector].filter(function (item) {
                        return item !== x
                    })]
                })
                encontrado = true
            }
        });

        // si no s'ha trobat, no era de ningu, per tant ara pertany a [selected]
        if (!encontrado) {
            setOperandOwners({
                ...operandOwners,
                [selected]: [...operandOwners[selected], x]
            })
        }
    }

    // Volem cacular els resultats
    useEffect(() => {
        let cadenaString;
        let tempArray = [];
        Object.keys(operandOwners).forEach(element => {
            cadenaString = ''
            for (let i = 0; i < operandOwners[element].length; i++) {
                cadenaString = cadenaString + operandsJunts[operandOwners[element][i]]
            }
            tempArray.push(convertirCadena(cadenaString))
        });
        setOperandResults(tempArray)
    }, [operandOwners])

    // Convertir cadena de caracteres en resultado matematico
    const convertirCadena = (cadena) => {
        cadena = cadena.replace(/x/gi, "*"); // Reemplaza todas las "x" por "*" en la cadena        
        if (
            !cadena.trim() || // Si la cadena está vacía o solo contiene espacios
            /[^0-9()+\-*\/.\s]/.test(cadena) || // Si la cadena contiene caracteres no permitidos
            /([+\-*/x]){2}/.test(cadena) || // Si la cadena tiene dos operadores seguidos
            /[^0-9]$/.test(cadena) || // Si la cadena termina con un operador
            /^[^0-9]/.test(cadena) || // Si la cadena empieza con un operador
            /[0-9]{3}/.test(cadena) || // Si la cadena tiene tres números seguidos
            /^[0-9]+$/.test(cadena) // Si la cadena solo contiene números
        ) {
            return 0;
        }
        return eval(cadena);
    };

    const calculafinal = () => {
        // Si no hi ha results tornem false pk si no pot haber errors
        let completed = operandResults.length > 0 && true;
        // comprobem si tots els operands tenen el result correcte
        operandResults.forEach((element, i) => {
            if (element !== values.results[i]) {
                completed = false
            }
        });
        // comprobem si s'han fer servir tots els operands
        operandColors.forEach((element, i) => {
            if (element == "white") {
                completed = false
            }
        })        
        return completed
    }

    useEffect(() => {
        setTimeout(() => {
            if (calculafinal()) {
                alert('bien echo!')
                handleWin()
            }
        }, 100);
    }, [operandResults])

    // Click a un operand
    const handleClickOperand = (x) => {

        changeColor(x)
        changeOwner(x)


    }

    return (
        <div style={{ backgroundColor: 'black' }}>
            {arrayBuid.map((cosa, index) => (
                <div key={index} className='d-flex flex-row'>
                    {arrayBuid.map((cosa, index2) => (
                        <div key={index2} className='d-flex align-items-center justify-content-center'
                            style={{ backgroundImage: `url(${squarePNG})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundColor: operandColors[(index * dimension) + index2], width: squareSize, height: squareSize, border: '5px solid white' }}
                            onClick={() => handleClickOperand((index * dimension) + index2)}>
                            <h3>{operandsJunts[(index * dimension) + index2]}</h3>
                        </div>
                    ))}
                </div>
            ))}
            <h5 style={{ color: 'orange', marginTop: '2px', fontWeight: '700' }}>Objectives:</h5>
            <div className='d-flex flex-row justify-content-center'>
                {values.results.map((cosa, index) => (
                    <div key={"a" + index}>
                        <div key={"b" + index} className='d-flex flex-row'>
                            <div key={index} className='d-flex align-items-center justify-content-center'
                                style={{ backgroundImage: `url(${cuadroPNG})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundColor: colors[index], width: squareSize, height: squareSize, border: selected === index ? '1px solid black' : '25px solid black' }}
                                onClick={() => setSelected(index)}>
                                <h3 style={{ fontWeight: 800, color: values.results[index] === operandResults[index] ? 'green' : 'black' }}>{cosa}</h3>
                            </div>
                        </div>
                        <div key={"c" + index} className='d-flex flex-row justify-content-center'>
                            <p style={getNumeritosStyle(values.results[index], operandResults[index])}>{operandOwners[index] && operandOwners[index].map((cosa, index) => (
                                operandsJunts[cosa]
                            ))} = {operandResults[index]}</p>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

const getNumeritosStyle = (a, b) => ({
    position: 'relative',
    top: -25,
    fontWeight: 700,
    color: a === b ? 'green' : 'red'
});

export default Grid