import logo from "./logo.svg";
import "./App.css";
import "./styles/common.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Players from "./views/Players/Players";
import PlayerCheck from "./views/Players/PlayerCheck";
import StartGame from "./views/Game/StartGame";
import Scoreboard from "./views/Scoreboard/Scoreboard";

function App() {
  return (
    <Router>
      <div className="App" style={{ display: "flex", flexDirection: "column" }}>
        <Link to="/">Inicio</Link>
        <Link to="/players">Jugadores</Link>
        <Link to="/scoreboard">Puntajes por equipo</Link>
        <Link to="/start-new-game">Empezá un nuevo juego (no se guardará tu puntaje)</Link>

        <Switch>
          <Route exact path="/">
            <h1>Quizgame!</h1>
            <img alt="React logo" height="100px" src={logo} />
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
  );
}

export default App;
