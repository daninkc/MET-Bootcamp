const FinalScore = (props) => {
    console.log('In final score:', props)
    const { playerName, score } = props.info;
    return (
        <h1>Gracias por jugar, {playerName}! Tu puntaje es { score }</h1>
    )
};
export default FinalScore;