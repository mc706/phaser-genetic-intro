import GeneticState from '../base/state';

/**
 * Load State. This setups up a single simulation
 */
export default class Load extends GeneticState {
    public create(): void {
        this.game.state.start('main');
    }

}
