import {degToRad, getPercentageChance, getRandomAngle, guid} from '../util/math';
import GeneticGame from '../base/game';

export default class Bot {
    id: string;
    game: GeneticGame;
    brain: Brain;
    position: Phaser.Point;
    parent: Bot | null;

    constructor(game: GeneticGame, x: number, y: number) {
        this.id = guid();
        this.game = game;
        this.brain = new Brain(this.game.bot_brain_size);
        this.position = new Phaser.Point(x, y);
        this.parent = null;
    }

    show(): void {
        this.game.context.fillStyle = 'rgb(255,0,0)';
        this.game.context.fillRect(this.position.x, this.position.y, 4, 4);
    }

    move(): void {
        let direction = this.brain.nextInstruction();
        if (direction !== null) {
            let dx = Math.cos(degToRad(direction)) * 2;
            let dy = Math.sin(degToRad(direction)) * 2;

            this.position = this.position.add(dx, dy);
        } else {
            console.log('Die from tiemout');
            this.die();
        }
        if (!Phaser.Rectangle.containsPoint(this.game.world.bounds, this.position)) {
            console.log('Die from bounds');
            this.die();
        }
        if (this.position === this.game.target) {
            console.log('Die from target');
            this.die();
        }
    }

    die(): void {
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
            return null;
        }
        this.step += 1;
        return instruction;
    }

    reset() {
        this.step = 0;
        console.log(this.step, this.instructions);
    }

    mutate() {
        for (let i = 0; i < this.instructions.length; i++) {
            if (getPercentageChance(MUTATION_RATE)) {
                this.instructions[i] = getRandomAngle();
            }
        }
    }
}
