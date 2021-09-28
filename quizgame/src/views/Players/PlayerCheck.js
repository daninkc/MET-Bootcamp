import { useState } from 'react'
import FirstTimePlayer from './FirstTimePlayer'
import ReturningPlayer from './ReturningPlayer'

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
    <div className="button-container">
      <button
        className="button-home"
        onClick={() => setPlayerType('firstTimer')}
      >
        Primera vez
      </button>
      <button
        className="button-home"
        onClick={() => setPlayerType('returning')}
      >
        Jugar de nuevo
      </button>
      <PlayerInputScreen />
    </div>
  )
}
export default PlayerCheck
