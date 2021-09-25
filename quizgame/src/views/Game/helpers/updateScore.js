import put from '../../../helpers/put';

export default async function updateScore(currentScore, playerId) {
    console.log('Updating score...')
    console.log('Here is the final score:', currentScore)
    let item = {
        score: currentScore
    }
    item = JSON.stringify(item)
    const updatedScore = await put(`https://6141ec414d16670017ba2a7b.mockapi.io/api/v1/players/${playerId}`, item)
    console.log('Updated score:', updatedScore)
     return updatedScore
}