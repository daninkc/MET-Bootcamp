import { useState } from "react";
import FirstTimePlayer from "./FirstTimePlayer";
import ReturningPlayer from "./ReturningPlayer";

const PlayerCheck = () => {
  const [playerType, setPlayerType] = useState('')

  const PlayerInputScreen = () => {
      if (playerType.length > 0 && playerType === 'firstTimer') {
          return <FirstTimePlayer />
      } else if (playerType.length > 0 && playerType === 'returning') {
          return <ReturningPlayer />
      } else {
          return null
      }
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
      <button onClick={() => setPlayerType('firstTimer')}>¿Primera vez?</button>
      <button onClick={() => setPlayerType('returning')}>¿Jugar de nuevo?</button>
      <PlayerInputScreen />
    </div>
  );
};
export default PlayerCheck;
