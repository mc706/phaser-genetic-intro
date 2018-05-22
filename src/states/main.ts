import GeneticState from '../base/state';

export default class Main extends GeneticState {

    public update(): void {
        this.game.bot.move();
    }

    public render(): void {
        let circle = new Phaser.Circle(this.game.target.x, this.game.target.y, 16);
        this.game.debug.geom(circle,  'rgb(0,255,0)');
        this.game.bot.show();
    }
}
