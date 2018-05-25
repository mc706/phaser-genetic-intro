import GeneticState from '../base/state';

export default class Main extends GeneticState {

    public update(): void {
        for (let bot of this.game.species) {
            if (!bot.dead) {
                bot.move();
            }
        }
        if (this.game.species.every(b => b.dead)) {
            this.game.state.start('analyse');
        }
    }

    public render(): void {
        let circle = new Phaser.Circle(this.game.target.x, this.game.target.y, 16);
        this.game.debug.geom(circle,  'rgb(0,255,0)');
        for (let bot of this.game.species) {
            bot.show();
        }
    }
}
