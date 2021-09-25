import { useState, useEffect } from "react";
import { useRouteMatch, Switch, Route } from "react-router";
import get from "../../helpers/get";
import Loader from "../../components/Loader";

const Players = () => {
  const match = useRouteMatch();
  const [players, setPlayers] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const myPlayers = await get(
        "https://6141ec414d16670017ba2a7b.mockapi.io/api/v1/players?orderBy=score"
      );
      if (myPlayers) {
        setLoaded(true);
        setPlayers(myPlayers.reverse());
      }
    }
    fetchData();
  }, []);

  const TeamFlag = (props) => {
    const { color } = props;
    return (
      <span
        style={{
          backgroundColor: `${color}`,
          marginLeft: "20px",
          marginRight: "20px",
          padding: "5px",
          textTransform: "capitalize",
        }}
      >
        {color}
      </span>
    );
  };

  return (
    <div>
      <Switch>
        <Route path={match.path}>
          <h3>Jugadores</h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {!loaded && <Loader />}

            {loaded &&
              players.length > 0 &&
              players?.map((item, key) => {
                return (
                  <div
                    key={key}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: "10px",
                    }}
                  >
                    <span>{item.playerName}</span>
                    <TeamFlag color={item.team} />
                    <span>{item.score}</span>
                  </div>
                );
              })}
          </div>
        </Route>
      </Switch>
    </div>
  );
};
export default Players;
