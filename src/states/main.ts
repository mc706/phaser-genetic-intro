import GeneticState from '../base/state';
import Obstacle from '../bot/obstacle';

export default class Main extends GeneticState {
    setting: boolean = false;
    line: Phaser.Line = new Phaser.Line(0, 0, 0, 0);

    public create() {
        this.game.input.onDown.add(this.startObstacle, this);
    }

    public update(): void {
        for (let bot of this.game.species) {
            if (!bot.dead) {
                bot.move();
            }
        }
        if (this.game.species.every(b => b.dead)) {
            this.game.state.start('analyse');
        }
        if (this.setting) {
            if (this.game.input.activePointer.isDown) {
                this.line.end.set(this.game.input.activePointer.x, this.game.input.activePointer.y);
            } else {
                this.setting = false;
                this.game.obstacles.push(new Obstacle(this.game, this.line.clone()));
            }
        }
    }

    public render(): void {
        let circle = new Phaser.Circle(this.game.target.x, this.game.target.y, 16);
        this.game.debug.geom(circle, 'rgb(0,255,0)');
        for (let bot of this.game.species) {
            bot.show();
        }
        for (let obstacle of this.game.obstacles) {
            obstacle.show();
        }
    }

    startObstacle(pointer: any): void {
        this.setting = true;
        this.line.start.set(pointer.x, pointer.y);

    }
}
