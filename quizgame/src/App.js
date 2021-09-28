import logo from './assets/home.svg'
import logoMet from './assets/logo-met.png'
import './styles/common.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Players from './views/Players/Players'
import PlayerCheck from './views/Players/PlayerCheck'
import StartGame from './views/Game/StartGame'
import Scoreboard from './views/Scoreboard/Scoreboard'

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <img alt="Logo met" height="50px" src={logoMet} />
          <Link className="link" to="/">
            Inicio
          </Link>
          <Link className="link" to="/start-new-game">
            Empezar nuevo juego
          </Link>
          <Link className="link" to="/players">
            Jugadores
          </Link>
          <Link className="link" to="/scoreboard">
            Puntajes por equipo
          </Link>
        </nav>
        <Switch>
          <Route exact path="/">
            <div className="container">
              <img alt="Quiz logo" height="350px" src={logo} />
              <div className="title-quiz">
                <h1 className="quiz">QUIZGA</h1>
                <h1 className="quiz">M</h1>
                <h1 className="quiz" style={{ color: '#F6BF5E' }}>
                  E
                </h1>
                <h1 className="quiz" style={{ color: '#2399A6' }}>
                  T
                </h1>
              </div>
            </div>
            <PlayerCheck />
          </Route>
          <Route path="/players">
            <Players />
          </Route>
          <Route exact path="/start-new-game">
            <StartGame />
          </Route>
          <Route path="/scoreboard">
            <Scoreboard />
          </Route>
          <Route path="/start-new-game/:id">
            <StartGame />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
