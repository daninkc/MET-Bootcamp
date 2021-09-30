export default function translate(team) {
    switch (team) {
        case 'red':
            return 'Rojo'
        case 'blue':
            return 'Azul'
        case 'green':
            return 'Verde'
        default:
            return team
    }
}