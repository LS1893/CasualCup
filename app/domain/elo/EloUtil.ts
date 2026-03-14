import type {FinalScore} from "~/domain/match/FinalScore";
import EloRating from "elo-rating";

export function adjustEloRatings(finalScore: FinalScore) {
    const bAvgRating = finalScore.bAvgRating()
    finalScore.aPlayers.forEach((player) => {
        player.rating = EloRating.calculate(
            player.rating,
            finalScore.bAvgRating(),
            finalScore.aWin()
        ).playerRating
    })

    finalScore.bPlayers.forEach((player) => {
        player.rating = EloRating.calculate(
            player.rating,
            finalScore.aAvgRating(),
            finalScore.bWin()
        ).playerRating
    })
}