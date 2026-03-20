import type { Player } from "~/domain/player/Player";
import { v4 as uuidv4 } from 'uuid';

export class FinalScore {
    id: string;
    aPlayers: Player[];
    aScore: number;
    bPlayers: Player[];
    bScore: number;

    constructor(id: string, aPlayers: Player[], aScore: number, bPlayers: Player[], bScore: number) {
        if (id == undefined || id == "") {
            this.id = uuidv4();
        } else {
            this.id = id;
        }
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

    static fromJSON(obj: any): FinalScore {
        const aPlayers = obj.aPlayers.map((p: any) => ({
            id: p.id,
            name: p.name,
            rating: p.rating,
            matches: p.matches,
        }));
        const bPlayers = obj.bPlayers.map((p: any) => ({
            id: p.id,
            name: p.name,
            rating: p.rating,
            matches: p.matches,
        }));

        return new FinalScore(
            obj.id,
            aPlayers,
            obj.aScore,
            bPlayers,
            obj.bScore,
        );
    }

}