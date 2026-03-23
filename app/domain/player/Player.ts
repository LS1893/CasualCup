import { ELO_INITIAL_RATING } from '~/config/MatchOptions';
export class Player {
    id: number;
    name: string;
    rating: number;
    matches: number;

    constructor(id: number, name: string, score: number | null) {
        this.id = id;
        this.name = name;
        if (score == null) {
            this.rating = ELO_INITIAL_RATING;
        } else {
            this.rating = score;
        }
        this.matches = 0;
    }

    static fromPlainObject(obj: any): Player {
        return new Player(obj.id, obj.name, ELO_INITIAL_RATING);
    }

}