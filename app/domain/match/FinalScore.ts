import type { Player } from "~/domain/player/Player";
import { v4 as uuidv4 } from 'uuid';

export class FinalScore {
    id: string;
    aPlayers: Player[];
    aScore: number;
    bPlayers: Player[];
    bScore: number;

    constructor(aPlayers: Player[], aScore: number, bPlayers: Player[], bScore: number) {
        this.id = uuidv4();
        this.aPlayers = aPlayers;
        this.aScore = aScore;
        this.bPlayers = bPlayers;
        this.bScore = bScore;
    }

    aWin(): boolean {
        return this.aScore > this.bScore;
    }

    bWin(): boolean {
        return this.bScore > this.aScore;
    }

    aAvgRating(): number {
        return this.avgRating(this.aPlayers);
    }

    bAvgRating(): number {
        return this.avgRating(this.bPlayers);
    }

    private avgRating(players: Player[]): number {
        return players.map(it => it.rating).reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0,
        ) / players.length;
    }
}