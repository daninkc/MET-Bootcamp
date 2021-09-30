import put from '../../../helpers/put';

export default async function updateScore(currentScore, playerId) {
    let item = {
        score: currentScore
    }
    item = JSON.stringify(item)
    const updatedScore = await put(`https://6141ec414d16670017ba2a7b.mockapi.io/api/v1/players/${playerId}`, item)
     return updatedScore
}