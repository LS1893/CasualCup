import { ref } from 'vue'
import { FinalScore } from '~/domain/match/FinalScore';
import { adjustEloRatings } from "~/domain/elo/EloUtil"
import { Player } from '~/domain/player/Player';
import { ELO_INITIAL_RATING } from '~/config/MatchOptions';

export function calculateScoreTable(players: Player[], matches: FinalScore[]) {

  const playerMap = new Map<number, Player>();
  for (const player of players) {
    playerMap.set(player.id, player);
  }

  for (const player of players) {
    player.matches = 0;
    player.rating = ELO_INITIAL_RATING;
  }


  const involvedPlayerIds = new Set<number>();


  for (const match of matches) {
    const playersInThisMatch: Player[] = [];


    const processPlayer = (playerData: Player) => {
      const globalPlayer = playerMap.get(playerData.id);
      if (globalPlayer) {

        globalPlayer.matches += 1;
        involvedPlayerIds.add(globalPlayer.id);

        playersInThisMatch.push(globalPlayer);
      } else {
        console.warn(`Spieler mit ID ${playerData.id} nicht in der globalen Spielerliste gefunden.`);
      }
    };
    for (const player of match.aPlayers) {
      processPlayer(player);
    }
    for (const player of match.bPlayers) {
      processPlayer(player);
    }

    const matchForEloCalculation = new FinalScore(
      match.id,
      playersInThisMatch.slice(0, match.aPlayers.length),
      match.aScore,
      playersInThisMatch.slice(match.aPlayers.length),
      match.bScore
    );


    adjustEloRatings(matchForEloCalculation);
  }


  const activePlayers: Player[] = [];
  for (const playerId of involvedPlayerIds) {
    const player = playerMap.get(playerId);
    if (player) {
      activePlayers.push(player);
    }
  }


  activePlayers.sort((a, b) => b.rating - a.rating);



  return activePlayers;
}