import GeneticState from '../base/state';
import Bot from '../bot/bot';
import {getRandomInRange} from '../util/math';

export default class Analyse extends GeneticState {

    public create(): void {
        let [max, average] = this.calculateFitness();

        let style = {font: '18px Arial', fill: '#ff0044', align: 'center'};
        this.game.add.text(100, 100, `Generation: ${this.game.current_generation}`, style);
        this.game.add.text(100, 150, `Fitness Max: ${max}`, style);
        this.game.add.text(100, 200, `Fitness Avg: ${average}`, style);

        let champion = this.game.species.reduce((a, c) => a.fitness > c.fitness ? a : c, new Bot(this.game, 0, 0));
        let newChamp = champion.clone();
        console.log(`Generation: ${this.game.current_generation}\nMax Fitness: ${max}\nAverage Fitness: ${average}`);
        this.createNextGeneration();
        this.mutateGeneration();
        this.game.species[0] = newChamp;
        setTimeout(this.reload.bind(this), PAUSE);
    }

    /**
     * Closer is better, less steps is better.
     * @returns {number}
     */
    private calculateFitness(): [number, number] {
        let fitnesses = [];
        for (let species of this.game.species) {
            fitnesses.push(species.calculateFitness());
        }
        let max = Math.max(...fitnesses);
        let average = fitnesses.reduce((t,c) => t + c, 0) / fitnesses.length;
        return [max, average];
    }

    private createNextGeneration(): void {
        let newGeneration = [];
        let totalFitness = this.game.species.reduce((a, c) => a + c.fitness, 0);
        while (newGeneration.length < POPULATION) {
            let parent = this.selectParent(totalFitness);
            newGeneration.push(parent.clone());
        }
        this.game.species = newGeneration;
        this.game.current_generation += 1;
    }

    private selectParent(total: number): Bot {
        let selector = getRandomInRange(0, total);
        let running = 0;
        for (let species of this.game.species) {
            running += species.fitness;
            if (running > selector) {
                return species;
            }
        }
    }

    private mutateGeneration(): void {
        this.game.species.forEach(s => s.brain.mutate());
    }

    private reload(): void {
        this.game.state.start('load');
    }
}
