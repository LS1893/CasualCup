export class Player {
    id: number;
    name: string;
    rating: number;

    constructor(id: number, name: string, score: number | null) {
        this.id = id;
        this.name = name;
        if(score == null) {
            this.rating = 1000;
        } else {
            this.rating = score;
        }
    }
}