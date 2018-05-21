import GeneticState from '../base/state';

/**
 * Boot State. This is setup and only run once when the simulation starts.
 */
export default class Boot extends GeneticState{
    public create(): void {
        // Set game target
        this.game.target = new Phaser.Point(...TARGET);

        this.game.state.start('load');
    }
}
