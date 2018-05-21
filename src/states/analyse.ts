import GeneticState from '../base/state';

export default class Analyse extends GeneticState {

    public create(): void {
        console.log('Analyse.create');
        let fitness = this.calculateFitness();

        this.game.data[this.game.current_generation] = this.game.data[this.game.current_generation] || {};
        this.game.data[this.game.current_generation][this.game.bot.id] = {fitness: fitness, bot: [...this.game.bot.brain.instructions]};

        let style = {font: '18px Arial', fill: '#ff0044', align: 'center'};
        this.game.add.text(100, 100, `Generation: ${this.game.current_generation}`, style);
        this.game.add.text(100, 150, `Species: ${this.game.current_species} | ${this.game.bot.id}`, style);
        this.game.add.text(100, 200, `Fitness: ${fitness}`, style);

        if (this.game.current_species === (this.game.population - 1)) {
            this.game.current_species = 0;
            this.createNextGeneration();
            this.mutateGeneration();
        } else {
            this.game.current_species += 1;
        }
        setTimeout(this.reload.bind(this), 5000);
    }

    /**
     * Closer is better, less steps is better.
     * @returns {number}
     */
    private calculateFitness(): number {
        let distance = this.game.bot.position.distance(this.game.target);
        let steps = this.game.bot.brain.step;
        return 100 / distance + 10 / steps;
    }

    private createNextGeneration(): void {

    }

    private mutateGeneration(): void {
        this.game.species.forEach(s => s.brain.mutate());
    }

    private reload(): void {
        this.game.state.start('load');
    }
}
