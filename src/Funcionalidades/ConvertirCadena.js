// Convierte una cadena en un numero matematico equivalente a su resultado
// Con ciertas reglas necesarias para que no haya "cheetos" xD

export const convertirCadena = (cadena) => {
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