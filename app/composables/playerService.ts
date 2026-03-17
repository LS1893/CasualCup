import { Player } from '~/domain/player/Player';
import initPlayersData from '~/data/initialPlayers.json';

class InitParser {
    parseInitPlayers(): Player[] {
        if (!Array.isArray(initPlayersData)) {
            console.error('Initial players data is not an array:', initPlayersData);
            return [];
        }

        return initPlayersData.map((playerJson: any) => Player.fromPlainObject(playerJson));
    }
}

export const initParser = new InitParser();