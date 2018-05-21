import GeneticState from '../base/state';
import Bot from '../bot/bot';

/**
 * Load State. This setups up a single simulation
 */
export default class Load extends GeneticState {
    public create(): void {


        this.game.bot = new Bot(this.game, 50, 750);
        this.game.state.start('main')
    }

}
