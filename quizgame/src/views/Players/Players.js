import { useState, useEffect } from 'react'
import { useRouteMatch, Switch, Route } from 'react-router'
import get from '../../helpers/get'
import Loader from '../../components/Loader'

const Players = () => {
  const match = useRouteMatch()
  const [players, setPlayers] = useState({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const myPlayers = await get(
        'https://6141ec414d16670017ba2a7b.mockapi.io/api/v1/players?orderBy=score'
      )
      if (myPlayers) {
        setLoaded(true)
        setPlayers(myPlayers.reverse())
      }
    }
    fetchData()
  }, [])

  const TeamFlag = (props) => {
    const { color } = props
    return (
      <span
        className="team-column"
        style={{
          backgroundColor: `${color}`,
        }}
      >
        {color}
      </span>
    )
  }

  return (
    <div>
      <Switch>
        <Route path={match.path}>
          <div className="container-players">
            <h3 className="players-1">Nombre</h3>
            <h3 className="players-2">Equipo</h3>
            <h3 className="players-3">Puntos</h3>
            {!loaded && <Loader />}
            {loaded &&
              players.length > 0 &&
              players?.map((item, key) => {
                return (
                  <>
                    <span className="players-1">{item.playerName}</span>
                    <TeamFlag className="players-2" color={item.team} />
                    <span className="players-3">{item.score}</span>
                  </>
                )
              })}
          </div>
        </Route>
      </Switch>
    </div>
  )
}
export default Players
