import { useState } from "react";
import { Link } from "react-router-dom";
import Error from "../../components/Error";
import Loader from "../../components/Loader";
import post from "../../helpers/post";

const FirstTimePlayer = () => {
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loaded, setLoaded] = useState(true);
  const [newPlayerId, setNewPlayerId] = useState(0)

  async function registerPlayer() {
    setLoaded(false);
    if (name.length > 0 && team.length > 0) {
      setError(false);
      let item = {
        playerName: name,
        team: team,
        score: 0,
      };
      item = JSON.stringify(item);
      const postedPlayer = await post(
        "https://6141ec414d16670017ba2a7b.mockapi.io/api/v1/players",
        item
      );
      if (postedPlayer) {
        setLoaded(true);
        setSuccess(true);
        const { id } = postedPlayer;
        setNewPlayerId(id)
      }
    } else if (name.length === 0) {
      setError(
        "Por favor, ingresá un nombre para que podamos registrar tu puntaje."
      );
    } else if (team.length === 0) {
      setError("Por favor, elegí uno de los equipos.");
    }
  }

  const TeamPicker = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h4>Elige tu equipo...&nbsp;
          { team.length > 0 && <span>{team}</span> }
          </h4>
        <button onClick={() => setTeam("red")}>Rojo</button>
        <button onClick={() => setTeam("blue")}>Azul</button>
        <button onClick={() => setTeam("green")}>Verde</button>
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      {!success && (
        <>
          <span>Bienvenid@!!</span>
          <input
          style={{marginTop: '20px'}}
            type="text"
            placeholder="Tu nombre"
            onChange={(e) => setName(e.target.value)}
          ></input>
          <TeamPicker />
          <button
            style={{ marginTop: "30px" }}
            onClick={() => registerPlayer()}
          >
            Registrarse
          </button>
          <Error message={error} />
        </>
      )}
      {!loaded && <Loader />}
      {success && <Link to={`/start-new-game/${newPlayerId}`}>¡A jugar!</Link>}
    </div>
  );
};
export default FirstTimePlayer;
