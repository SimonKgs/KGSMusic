/* eslint-disable prettier/prettier */
//  colores para el fondo
export const getBGColor = () => {
    const colors = [
        'green',
        'blue',
        'orange',
        'purple',
        'gray',
        'teal',
        'yellow'
    ]
    return colors[Math.floor(Math.random() * colors.length)]
}