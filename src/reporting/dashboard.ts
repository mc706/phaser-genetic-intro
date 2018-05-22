import GeneticGame from '../base/game';
import Bot from '../bot/bot';
import * as Highcharts from 'highcharts';

export default class Dashboard {
    game: GeneticGame;
    last_gen: number;

    constructor(game: GeneticGame) {
        this.game = game;
        this.buildPage();
        this.render();
        this.last_gen = -1;
    }

    buildPage(): void {
        const body = document.querySelector('body');
        body.innerHTML += `<div class="dashboard">
    <h2 class="header">Genetic Algoirthm</h2>
    <div class="config"></div>
    <div class="current"></div>
    <div class="fitness"><div id="fitness-container"></div></div>
    <div class="gen-table"></div>
    <div class="geneology"></div>
</div>`;
    }

    render(): void {
        this.renderConfig();
        this.renderCurrent();
        this, this.renderFitness();
    }

    renderConfig(): void {
        let config = document.querySelector('.config');
        config.innerHTML = `
    <h5>Configuration:</h5>
    <p>
        <span>Population: ${this.game.population}</span></br>
        <span>Mutation Rate: ${MUTATION_RATE}%</span></br>
        <span>Brain Size: ${BRAIN_SIZE}</span></br>
    </p> `;
    }

    renderCurrent(): void {
        let current = document.querySelector('.current');
        let champion = this.game.species.reduce((a, c) => a.fitness > c.fitness ? a : c, new Bot(this.game, 0, 0));
        current.innerHTML = `
        <h5>Info</h5>
        <span>Current Generation: ${this.game.current_generation}</span></br>
        <span>Current Species: ${this.game.current_species}</span></br>
        <span>Max Fitness: ${champion.fitness}</span></br>
        <span>Average Fitness: ${this.game.species.reduce((a, c) => a + c.fitness, 0) / this.game.species.length}</span></br> `;
    }

    renderFitness() {
        if (this.last_gen < this.game.current_generation) {
            Highcharts.chart('fitness-container', {
                chart: {
                    type: 'line'
                },
                title: {
                    text: 'Fitness by Generation'
                },
                xAxis: {
                    allowDecimals: false,
                    title: {
                        text: 'Generation'
                    }
                },
                yAxis: {
                    title: {
                        text: 'Fitness'
                    }
                },
                series: [
                    {
                        name: 'Max Fitness',
                        data: this.game.data.map(species => species.reduce((a, c) => a > c.fitness ? a : c.fitness, 0))
                    },
                    {
                        name: 'Average Fitness',
                        data: this.game.data.map(species => species.reduce((a, c) => a + c.fitness, 0) / species.length)
                    }
                ]
            });
            this.last_gen = this.game.current_generation;
        }
    }


}

