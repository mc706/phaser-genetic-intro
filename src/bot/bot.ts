import {degToRad, getRandomAngle, guid} from '../util/math';
import GeneticGame from '../base/game';

export default class Bot {
    id: string;
    game: GeneticGame;
    brain: Brain;
    position: Phaser.Point;

    constructor(game: GeneticGame, x: number, y: number) {
        this.id = guid();
        this.game = game;
        this.brain = new Brain(800);
        this.position = new Phaser.Point(x, y);
    }

    show(): void {
        this.game.context.fillStyle = 'rgb(255,0,0)';
        this.game.context.fillRect(this.position.x, this.position.y, 4, 4);
    }

    move(): void {
        let direction = this.brain.nextInstruction();
        if (direction !== null) {
            let dx = Math.cos(degToRad(direction));
            let dy = Math.sin(degToRad(direction));

            this.position = this.position.add(dx, dy);
        } else {
            this.die();
        }
    }

    die(): void {
        let fitness = 0;
        this.game.state.start('analyse');

    }

}

class Brain {
    instructions: number[];
    size: number;
    step: number = 0;

    constructor(steps: number) {
        this.size = steps;
        this.randomize();
    }

    randomize(): void {
        let array = [];
            let i;
        for (i = 0; i < this.size; i++) {
            array.push(getRandomAngle());
        }
        this.instructions = array;
    }

    nextInstruction(): number | null {
        let instruction = this.instructions[this.step];
        if (!instruction) {
            return null
        }
        this.step += 1;
        return instruction;
    }
}
