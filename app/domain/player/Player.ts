export class Player {
    id: number;
    name: string;
    rating: number;
    matches: number;

    constructor(id: number, name: string, score: number | null) {
        this.id = id;
        this.name = name;
        if (score == null) {
            this.rating = 1000;
        } else {
            this.rating = score;
        }
        this.matches = 0;
    }

    static fromPlainObject(obj: any): Player {
        return new Player(obj.id, obj.name, 1000);
    }

}