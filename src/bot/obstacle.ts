import GeneticGame from '../base/game';

export default class Obstacle {
    game: GeneticGame;
    corner_line: Phaser.Line;

    constructor(game: GeneticGame, line: Phaser.Line) {
        this.game = game;
        this.corner_line = line;
    }


    show(): void {
        let rectangle = this.toRect();
        this.game.debug.geom(rectangle, 'rgb(0, 0, 255)');
    }

    contains(point: Phaser.Point): boolean {
        let rectangle = this.toRect();
        return rectangle.contains(point.x, point.y);
    }

    private toRect(): Phaser.Rectangle {
        let width = Math.abs(this.corner_line.end.x - this.corner_line.start.x);
        let height = Math.abs(this.corner_line.end.y - this.corner_line.start.y);
        return new Phaser.Rectangle(this.corner_line.start.x, this.corner_line.start.y, width, height);
    }
}
