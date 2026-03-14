import type {FinalScore} from "~/domain/match/FinalScore";
import EloRating from "elo-rating";

export function adjustEloRatings(finalScore: FinalScore) {
    // if draw then don't recalculate the scores
    // a normal elo rating would adjust even when a draw happens
    // however this simple elo library does not have that possibility.
    // A different library needs to be employed if draws want to be considered.
    if(!finalScore.aWin() && !finalScore.bWin()) {
        return
    }

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