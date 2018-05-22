import GeneticState from '../base/state';
import Bot from '../bot/bot';

/**
 * Boot State. This is setup and only run once when the simulation starts.
 */
export default class Boot extends GeneticState {
    public create(): void {
        // Set game target
        this.game.target = new Phaser.Point(...TARGET);
        this.game.data = {};

        for (let i = 0; i < POPULATION; i++) {
            this.game.species.push(new Bot(
                this.game,
                SPAWN[0],
                SPAWN[1])
            );
        }
        this.game.current_species = 0;
        this.game.state.start('load');
    }
}
