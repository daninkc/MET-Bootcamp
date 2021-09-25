const AnswerMessage = (props) => {
  const { answerWasClicked, correctAnswerClicked } = props;
  if (answerWasClicked && correctAnswerClicked) {
    return <span>Correcto!!!!</span>;
  } else if (answerWasClicked && !correctAnswerClicked) {
    return <span>OH, noooooo</span>;
  } else {
    return null;
  }
};
export default AnswerMessage;
