import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Loader from "../../components/Loader";
import get from "../../helpers/get";
import shuffleArray from "../../helpers/shuffleArray";
import AnswerMessage from "./AnswerMessage";
import FinalScore from "./FinalScore";
import updateScore from "./helpers/updateScore";

const StartGame = () => {
  const { id } = useParams()
  const [question, setQuestion] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answerWasClicked, setAnswerWasClicked] = useState(false);
  const [correctAnswerClicked, setCorrectAnswerClicked] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [currentScore, setCurrentScore] = useState(0)
  const [finalScore, setFinalScore] = useState(0)

  async function fetchData() {
    const beQuestion = await get(
      `https://6141ec414d16670017ba2a7b.mockapi.io/api/v1/questions?id=${questionIndex}`
    );
    console.log('BE question:', beQuestion)
    if (beQuestion && beQuestion.length > 0) {
      setLoaded(true);
      setQuestion(beQuestion);
      setQuestionIndex(questionIndex + 1);
    } else {
      console.log('No answer!')
      const updatedScore = await updateScore(currentScore, id)
      setLoaded(true)
      setFinalScore(updatedScore)
    }
  }

  useEffect(() => {
    //Apenas carga el componente, obtengo la información inicial
    fetchData();
  }, []);

  function checkCorrectAnswer(item) {
    setAnswerWasClicked(true);
    if (item.correct === true) {
      setCorrectAnswerClicked(true);
      const newScore = item.score + currentScore;
      setCurrentScore(newScore)
    }
  }

  const AnswerList = (props) => {
    const { answerList } = props;
    const right = answerList.rightAnswer;
    const { answerA, answerB, answerC } = answerList.wrongAnswers[0];
    const answers = [
      {
        answer: right,
        correct: true,
        score: answerList.score
      },
      {
        answer: answerA,
        correct: false,
      },
      {
        answer: answerB,
        correct: false,
      },
      {
        answer: answerC,
        correct: false,
      },
    ];
    const shuffledArr = shuffleArray(answers);
    return (
      <>
        {shuffledArr.length > 0 &&
          shuffledArr.map((item, key) => {
            return (
              <button
                disabled={answerWasClicked}
                onClick={() => checkCorrectAnswer(item)}
                key={key}
              >
                {item.answer}
              </button>
            );
          })}
      </>
    );
  };

  function nextQuestion(questionIndex) {
    setLoaded(false);
    setAnswerWasClicked(false);
    setCorrectAnswerClicked(false);
    fetchData(questionIndex);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>Start!</h1>
      {!loaded && <Loader />}
      {question.length > 0 && loaded && !finalScore && (
        <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <h2>{question[0].question}</h2>
          <AnswerList
            answerWasClicked={answerWasClicked}
            answerList={question[0]}
          />
          <AnswerMessage
            answerWasClicked={answerWasClicked}
            correctAnswerClicked={correctAnswerClicked}
          />
          <button
            style={{ marginTop: "20px" }}
            onClick={() => nextQuestion(questionIndex)}
          >
            Siguiente pregunta
          </button>
        </div>
      )}
      { finalScore !== 0 &&
        <FinalScore info={finalScore} />
      }
    </div>
  );
};
export default StartGame;