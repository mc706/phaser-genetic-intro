import GeneticState from '../base/state';
import Bot from '../bot/bot';
import {getRandomInRange} from '../util/math';

export default class Analyse extends GeneticState {

    public create(): void {
        let fitness = this.calculateFitness();
        this.game.species[this.game.current_species].fitness = fitness;
        let style = {font: '18px Arial', fill: '#ff0044', align: 'center'};
        this.game.add.text(100, 100, `Generation: ${this.game.current_generation}`, style);
        this.game.add.text(100, 150, `Species: ${this.game.current_species} | ${this.game.bot.id}`, style);
        this.game.add.text(100, 200, `Fitness: ${fitness}`, style);

        if (this.game.current_species === (this.game.population - 1)) {
            this.game.current_species = 0;
            let champion = this.game.species.reduce((a, c) => a.fitness > c.fitness ? a : c, new Bot(this.game, 0, 0));
            let newChamp = champion.clone();
            console.log(`Generation: ${this.game.current_generation}\nMax Fitness: ${champion.fitness}\nAverage Fitness: ${this.game.species.reduce((a, c) => a + c.fitness, 0) / POPULATION}`);
            this.createNextGeneration();
            this.mutateGeneration();
            this.game.species[0] = newChamp;
        } else {
            this.game.current_species += 1;
        }
        this.game.dashboard.render();
        setTimeout(this.reload.bind(this), PAUSE);
    }

    /**
     * Closer is better, less steps is better.
     * @returns {number}
     */
    private calculateFitness(): number {
        let distance = this.game.bot.position.distance(this.game.target);
        let steps = this.game.bot.brain.step;
        if (distance < 10) {
            return 1E6 * (1.0 / 16.0 + 10000.0 / (steps ** 2));
        } else {
            return 1E6 * (1 / distance ** 2);
        }
    }

    private createNextGeneration(): void {
        let newGeneration = [];
        let totalFitness = this.game.species.reduce((a, c) => a + c.fitness, 0);
        while (newGeneration.length < POPULATION) {
            let parent = this.selectParent(totalFitness);
            newGeneration.push(parent.clone());
        }
        this.game.data[this.game.current_generation] = this.game.species;
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
