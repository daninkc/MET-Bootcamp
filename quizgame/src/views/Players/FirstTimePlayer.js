import { useState } from 'react'
import { Link } from 'react-router-dom'
import Error from '../../components/Error'
import Loader from '../../components/Loader'
import post from '../../helpers/post'
import translate from '../../helpers/translateTeamNames'

const FirstTimePlayer = () => {
  const [name, setName] = useState('')
  const [team, setTeam] = useState('')
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [loaded, setLoaded] = useState(true)
  const [newPlayerId, setNewPlayerId] = useState(0)

  async function registerPlayer() {
    setLoaded(false)
    if (name.length > 0 && team.length > 0) {
      setError(false)
      let item = {
        playerName: name,
        team: team,
        score: 0,
      }
      item = JSON.stringify(item)
      const postedPlayer = await post(
        'https://6141ec414d16670017ba2a7b.mockapi.io/api/v1/players',
        item
      )
      if (postedPlayer) {
        setLoaded(true)
        setSuccess(true)
        const { id } = postedPlayer
        setNewPlayerId(id)
      }
    } else if (name.length === 0) {
      setError(
        'Por favor, ingresá un nombre para que podamos registrar tu puntaje.'
      )
    } else if (team.length === 0) {
      setError('Por favor, elegí uno de los equipos.')
    }
  }

  const TeamPicker = () => {
    return (
      <div className="first-time-container">
        <h4 className="welcome">
          Elige un equipo:
          {team.length > 0 && <span> {translate(team)}</span>}
        </h4>
        <div className="button-container">
          <button className="button-team-red" onClick={() => setTeam('red')}>
            Rojo
          </button>
          <button
            className="button-team-green"
            onClick={() => setTeam('green')}
          >
            Verde
          </button>
          <button className="button-team-blue" onClick={() => setTeam('blue')}>
            Azul
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {!success && (
        <div className="first-time-container">
          <h4 className="welcome">Bienvenid@!!</h4>
          <input
            type="text"
            className="input-name"
            placeholder="Tu nombre"
            onChange={(e) => setName(e.target.value)}
          ></input>
          <TeamPicker />
          <button className="button-register" onClick={() => registerPlayer()}>
            Registrarme
          </button>
          <Error message={error} />
        </div>
      )}
      {!loaded && <Loader />}
      {success && (
        <Link className="start-play" to={`/start-new-game/${newPlayerId}`}>
          Click para empezar a jugar!!
        </Link>
      )}
    </div>
  )
}
export default FirstTimePlayer
