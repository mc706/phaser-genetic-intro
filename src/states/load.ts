import GeneticState from '../base/state';
import Bot from '../bot/bot';

export default class Load extends GeneticState {
    public preload(): void {

    }

    public create(): void {
        this.game.target = new Phaser.Point(750, 50);
        this.game.bot = new Bot(this.game, 50, 750);
        this.game.state.start('main')
    }

}