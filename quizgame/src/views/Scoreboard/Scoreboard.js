import { useState, useEffect } from 'react'
import Loader from '../../components/Loader'
import get from '../../helpers/get'
import translate from '../../helpers/translateTeamNames'

const Scoreboard = () => {
  const [teamScores, setTeamScores] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const teamRedInfo = await get(
        'https://6141ec414d16670017ba2a7b.mockapi.io/api/v1/players?team=red'
      )
      const teamBlueInfo = await get(
        'https://6141ec414d16670017ba2a7b.mockapi.io/api/v1/players?team=blue'
      )
      const teamGreenInfo = await get(
        'https://6141ec414d16670017ba2a7b.mockapi.io/api/v1/players?team=green'
      )
      if (
        (teamRedInfo.length > 0,
        teamBlueInfo.length > 0,
        teamGreenInfo.length > 0)
      ) {
        setLoaded(true)
        const redScore = teamRedInfo.map((item) => {
          return item.score
        })
        const blueScore = teamBlueInfo.map((item) => {
          return item.score
        })
        const greenScore = teamGreenInfo.map((item) => {
          return item.score
        })
        const reducer = (previousValue, currentValue) =>
          previousValue + currentValue
        const totalRed = redScore.reduce(reducer)
        const totalBlue = blueScore.reduce(reducer)
        const totalGreen = greenScore.reduce(reducer)
        const teamScores = [
          {
            team: 'red',
            score: totalRed,
          },
          {
            team: 'blue',
            score: totalBlue,
          },
          {
            team: 'green',
            score: totalGreen,
          },
        ]
        const myScores = teamScores.sort((a, b) => {
          return a.score - b.score
        })
        setTeamScores(myScores.reverse())
      }
    }
    fetchData()
  }, [])

  return (
    <div className="container">
      <h1 className="quiz" style={{ marginTop: 30 }}>
        PUNTAJE TOTAL
      </h1>
      {!loaded && <Loader />}
      {teamScores &&
        teamScores.map((item, key) => {
          return (
            <div className="container-inline">
              <h2 key={key} className="question">
                Equipo {translate(item.team)}:
              </h2>
              <h2 style={{ color: item.team, marginLeft: 4 }}>
                {item.score} puntos
              </h2>
            </div>
          )
        })}
    </div>
  )
}
export default Scoreboard
