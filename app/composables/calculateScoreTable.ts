import { ref } from 'vue'
import { FinalScore } from '~/domain/match/FinalScore';
import { adjustEloRatings } from "~/domain/elo/EloUtil"
import { Player } from '~/domain/player/Player';

export function calculateScoreTable(players: Player[], matches: FinalScore[]) {
  const headers = [
    { title: '', key: 'position' },
    { title: 'Name', key: 'name' },
    { title: 'Spiele', key: 'matches' },
    { title: 'Punktzahl', key: 'rating' }
  ]

  //onsole.log('Inside calculateScoreTable, matches received:', matches);

  if (typeof matches === "undefined") {
    return;
  }

  const playerScores = new Set();

  for (const match of matches) {
    let aPlayer1 = match.aPlayers[0];
    let aPlayer2 = match.aPlayers[1];
    let bPlayer1 = match.aPlayers[0];
    let bPlayer2 = match.aPlayers[1];

    console.log('score before: ' + aPlayer1?.rating);

    adjustEloRatings(match);

    console.log('score after: ' + aPlayer1?.rating);

  }





  const rankingList = ref([
    { name: 'Player 2', position: 2, matches: 3, rating: '1405' },
    { name: 'Player 1', position: 1, matches: 3, rating: '1350' },

    { name: 'Player 3', position: 3, matches: 3, rating: '960' }
  ])

  return {
    headers,
    rankingList

  }
}