import { convertirCadena } from "./ConvertirCadena"
import { randomIntFromInterval } from "./RandomIntFromInterval"
import { shuffleArray } from "./ShuffleArray"

// Crea un tablero de juego completo de x dimensión, min y max valores de resultado
export const creadorAleatorioDeValores = (x, min, max, variante = false, carrera = false) => {
    let celdasTotales = x * x
    let cajones = x === 2 ? 1 : x
    let arrayOperands = []
    const CHARS = [1, 2, 3, 4, 5, 6, 7, 8, 9, '+', 'x', '/', '-']

    if (variante) {
        if (cajones != 2) {
            cajones = randomIntFromInterval(1, cajones)
        }
    }

    if (carrera) {
        cajones = 1;
    }

    // Volem 4 resultats i han de sumar x * x operands. So:        
    let digitsCadaOperand = []
    let sumaDigits
    // Buscarem fins a trobar una combinacio correcte
    while (sumaDigits !== celdasTotales) {
        sumaDigits = 0
        digitsCadaOperand = []
        // Aquí només busquem combinacio de "de quants operands consta cada resultat"
        for (let i = 0; i < cajones; i++) {
            let randomNumb = randomIntFromInterval(3, (x * x))
            digitsCadaOperand.push(randomNumb)
            sumaDigits = sumaDigits + randomNumb
        }
    }

    // Tenim la combinació de digits a: digitsCadaOperand
    // Hem de crear cada operació
    let buscando = true
    let randPos
    let helperArray = []
    let string = ''
    let lineaError = true
    let results = []

    console.log("digits cad operand: " + digitsCadaOperand);
    console.log("dimension: " + x);
    while (buscando) {
        console.log("1era liniea buscando");
        for (let i = 0; i < cajones; i++) {
            console.log("dins primer for");
            lineaError = true
            while (lineaError) {
                console.log("dins primer while");
                string = ''
                helperArray = []
                // fem un loop segons cada operandLengs
                for (let j = 0; j < digitsCadaOperand[i]; j++) {
                    console.log("dins segon for");
                    randPos = randomIntFromInterval(0, CHARS.length - 1)
                    helperArray.push(CHARS[randPos])
                    string = string + CHARS[randPos]
                }
                console.log(string);
                // Aquest string no ha de ser = 0
                let result = convertirCadena(string)
                console.log(result);
                if ((Number.isInteger(result)) && (result > min) && (result <= max) && (result !== 0)) {
                    console.log("minim: " + min + "max: " + max);
                    lineaError = false // significa que es correcte al busqueda
                    results.push(result)
                }
            }
            arrayOperands.push(helperArray)
        }
        buscando = false
    }
    let shufflet = shuffleArray(arrayOperands.flat())
    // END creador aletori, retornem resultat 
    return {
        dimension: x,
        results: results,
        operands: arrayOperands,
        operandsShuffled: shufflet
    }
}