import Right from '../../assets/right.gif'
import Wrong from '../../assets/wrong.gif'

const AnswerMessage = (props) => {
  const { answerWasClicked, correctAnswerClicked, correct } = props
  if (answerWasClicked && correctAnswerClicked) {
    return (
      <div
        className="app"
        style={{
          flexDirection: 'column',
        }}
      >
        <h4 className="correct">¡¡Bien!!</h4>
        <img alt="Right answer" height="250px" width="auto" src={Right}></img>
      </div>
    )
  } else if (answerWasClicked && !correctAnswerClicked) {
    return (
      <div
        className="app"
        style={{
          flexDirection: 'column',
        }}
      >
        <h4 className="wrong">
          Oh, nooooo... La respuesta correcta era {correct}
        </h4>
        <img alt="Wrong answer" height="250px" width="auto" src={Wrong}></img>
      </div>
    )
  } else {
    return null
  }
}
export default AnswerMessage
