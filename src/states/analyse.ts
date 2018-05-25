import GeneticState from '../base/state';
import Bot from '../bot/bot';
import {getRandomInRange} from '../util/math';

export default class Analyse extends GeneticState {

    public create(): void {
        for (let bot of this.game.species) {
            bot.calculateFitness();
        }

        let champion = this.game.species.reduce((a, c) => a.fitness > c.fitness ? a : c, new Bot(this.game, 0, 0));
        let newChamp = champion.clone();
        console.log(`Generation: ${this.game.current_generation}\nMax Fitness: ${champion.fitness}\nAverage Fitness: ${this.game.species.reduce((a, c) => a + c.fitness, 0) / POPULATION}`);
        this.createNextGeneration();
        this.mutateGeneration();
        this.game.species[0] = newChamp;
        this.game.dashboard.render();
        setTimeout(this.reload.bind(this), PAUSE);
    }


    private createNextGeneration(): void {
        let newGeneration = [];
        let totalFitness = this.game.species.reduce((a, c) => a + c.fitness, 0);
        while (newGeneration.length < POPULATION) {
            let parent = this.selectParent(totalFitness);
            newGeneration.push(parent.clone());
        }
        // inject fresh genes
        let fresh_gene_count = Math.round(POPULATION * FRESH_GENES_PERCENT / 100);
        for (let i = 1; i <= fresh_gene_count; i++){
            newGeneration[newGeneration.length - i] = new Bot(this.game, SPAWN[0], SPAWN[1]);
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
