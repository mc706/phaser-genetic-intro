import {degToRad, getPercentageChance, getRandomAngle, guid} from '../util/math';
import GeneticGame from '../base/game';

export default class Bot {
    id: string;
    game: GeneticGame;
    brain: Brain;
    position: Phaser.Point;
    velocity: Phaser.Point;
    parent: Bot | null;
    step_length: number = 1;
    fitness: number | null = null;
    isDead:boolean = false;

    constructor(game: GeneticGame, x: number, y: number) {
        this.id = guid();
        this.game = game;
        this.brain = new Brain(this.game.bot_brain_size);
        this.position = new Phaser.Point(x, y);
        this.velocity = new Phaser.Point(0, 0);
        this.parent = null;
    }

    show(): void {
        this.game.context.fillStyle = 'rgb(255,0,0)';
        this.game.context.fillRect(this.position.x, this.position.y, 4, 4);
    }

    move(): void {
        let direction = this.brain.nextInstruction();
        if (direction !== null) {
            let dx = Math.cos(degToRad(direction)) * this.step_length;
            let dy = Math.sin(degToRad(direction)) * this.step_length;

            this.velocity = this.velocity.add(dx, dy);
            this.velocity.clamp(-5, 5);
            this.position = this.position.add(this.velocity.x, this.velocity.y);
        } else {
            this.die();
        }
        if (!Phaser.Rectangle.containsPoint(this.game.world.bounds, this.position)) {
            this.die();
        }
        if (this.position.distance(this.game.target) < 16) {
            this.die();
        }
    }

    die(): void {
        this.isDead = true;
    }

    clone(): Bot {
        let bot = new Bot(this.game, SPAWN[0], SPAWN[1]);
        bot.parent = this;
        bot.brain = this.brain.clone();
        bot.isDead = false;
        return bot;
    }

    calculateFitness(): number {
        let distance = this.position.distance(this.game.target);
        let steps = this.brain.step;
        if (distance < 16) {
            this.fitness =  1E6 * (1.0 / 16.0 + 10000.0 / (steps ** 2));
        } else {
            this.fitness =  1E6 * (1 / distance ** 2);
        }
        return this.fitness;
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

    reset(): void {
        this.step = 0;
    }

    mutate(): void {
        for (let i = 0; i < this.instructions.length; i++) {
            if (getPercentageChance(MUTATION_RATE)) {
                this.instructions[i] = getRandomAngle();
            }
        }
    }

    clone(): Brain {
        let brain = new Brain(this.size);
        brain.instructions = this.instructions.slice(0);
        brain.step = 0;
        return brain;
    }
}
