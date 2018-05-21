import GeneticState from '../base/state';

/**
 * Load State. This setups up a single simulation
 */
export default class Load extends GeneticState {
    public create(): void {
        console.log('Load.create');
        this.game.bot = this.game.species[this.game.current_species];
        this.game.bot.brain.reset();
        this.game.state.start('main');
    }

}
