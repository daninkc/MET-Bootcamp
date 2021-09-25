import { useState } from "react";
import get from "../../helpers/get";
import Error from "../../components/Error";
import { useHistory } from "react-router";

const ReturningPlayer = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [playerList, setPlayerList] = useState({});
  const [error, setError] = useState(false);

  async function fetchPlayers() {
    console.log("Continue!, now we do the fetch");
    if (name.length > 0) {
      const playerInfo = await get(
        `https://6141ec414d16670017ba2a7b.mockapi.io/api/v1/players?playerName=${name}`
      );
      if (playerInfo.length > 0) {
        setPlayerList(playerInfo);
      } else {
        setError(
          "Ups, no pudimos encontrar un jugador con este nombre. Probá de nuevo!"
        );
      }
    } else {
      setError("Mmmm... parece que no hay ningún nombre");
    }
  }

  function handleInputChange(e) {
    setName(e.target.value);
    setError("");
  }

  function redirectToPlayer(item) {
    history.push(`/start-new-game/${item.id}`);
  }

  const PlayersThatMatch = () => {
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <span>Elige tu nombre para volver a jugar</span>
        {playerList.map((item, key) => {
          return <button onClick={() => redirectToPlayer(item)} key={key}>{item.playerName}</button>;
        })}
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
      <span>
        Vas a jugar nuevamente? Si la respuesta es sí, ingresá tu nombre:
      </span>
      <div>
        <input
          type="text"
          list="players"
          placeholder="Nombre del jugador..."
          onChange={(e) => handleInputChange(e)}
        ></input>
      </div>
        <button onClick={() => fetchPlayers()}>Continuar</button>
      <Error message={error} />
      {playerList.length > 0 && <PlayersThatMatch />}
    </div>
  );
};
export default ReturningPlayer;
