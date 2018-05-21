import GeneticState from '../base/state';

export default class Main extends GeneticState {
    public preload(): void {

    }

    public create(): void {

    }

    public update(): void {
        this.game.bot.move();
    }

    public render(): void {
        this.game.context.fillStyle = 'rgb(0,255,0)';
        this.game.context.fillRect(this.game.target.x, this.game.target.y, 8, 8);
        this.game.bot.show();
    }
}