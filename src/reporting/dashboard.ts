import GeneticGame from '../base/game';
import Bot from '../bot/bot';
import * as Highcharts from 'highcharts';

export default class Dashboard {
    game: GeneticGame;
    last_gen: number;
    rendered_species: any = {};

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
    <div class="description">
    This project is a demonstration of a genetic algorithm at work. Each Bot Species (red dot) starts in the bottom left
    corner of the field. It starts with a "Brain" made completely out randomly assigned directions. It will follow it's
    brain's list of instructions until it hits a wall, finds the target (green circle) or runs out of instructions. At 
    that time, the system will calculate its "fitness", which is a score based on how close to the target it got and how
    quickly it got there. After all the species in a generation has run, the system breeds a new generation, randomly 
    copying bots from the previous generation based on fitness (more fit bots get selected more often, linearly). We then
    apply random mutations at the mutation rate, randomly changing instructions in each bots brain. Some bots will change 
    for the better, others for the worse; the bots that change for the better will be more likely to propogate to the next
    generation, carrying forward its beneficial traits. Each generation also has an amount of "fresh genes", or bots not
    descended from any previous generation. These newly injected species allow for new traits to be introduced. 
</div>
    <div class="config"></div>
    <div class="current"></div>
    <div class="fitness"><div id="fitness-container"></div></div>
    <div class="gen-table"></div>
    <div class="geneology"><canvas id="geneology-canvas"></canvas></div>
</div>`;
        let canvas = <HTMLCanvasElement> document.querySelector('#geneology-canvas');
        let container = document.querySelector('.geneology');
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
    }

    render(): void {
        this.renderConfig();
        this.renderCurrent();
        this.renderFitness();
        this.renderGenTable();
        this.renderGeneology()
    }

    renderConfig(): void {
        let config = document.querySelector('.config');
        config.innerHTML = `
    <h5>Configuration:</h5>
    <p>
        <span>Population: ${this.game.population}</span></br>
        <span>Mutation Rate: ${MUTATION_RATE}%</span></br>
        <span>Brain Size: ${BRAIN_SIZE}</span></br>
        <span>Fresh Genes Percent: ${FRESH_GENES_PERCENT}%</span></br>
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

    renderFitness(): void {
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

    renderGenTable(): void {
        let gentable = document.querySelector('.gen-table');
        gentable.innerHTML = `<table>
    <thead>
    <tr>
        <th>Gen</th>
        <th>Max Fit.</th>
        <th>Avg Fit</th>
    </tr>
    </thead>
    <tbody>
        ${this.game.data.map((generation, index) => {
            let max = generation.reduce((a, c) => a > c.fitness ? a : c.fitness, 0);
            let avg = generation.reduce((a, c) => a + c.fitness, 0) / generation.length;
            return '<tr><td>' + index + '</td><td>' + max + '</td><td>' + avg + '</td></tr>';
        })}    
    </tbody>
</table>`;
    }

    renderGeneology() {
        let canvas = <HTMLCanvasElement> document.querySelector('#geneology-canvas');
        let ctx = canvas.getContext('2d');
        ctx.fillStyle = '#0000FF';
        let slot = Math.floor((canvas.width - 10) / POPULATION);
        let generations = [...this.game.data.slice(0), this.game.species.slice(0)];
        generations.forEach((generation, y) => {
            let sorted;
            if (y == 0) {
                sorted = generation.sort((a, b) =>a.id > b.id ? -1 : 1);
            } else {
                sorted = [];
                for (let prev_species of generations[y-1]) {
                    let children = generation.filter(species => species.parent ? species.parent.id === prev_species.id : false);
                    for (let child of children) {
                        sorted.push(child);
                    }
                }
                let fresh_genes = generation.filter(species => !species.parent);
                for (let child of fresh_genes) {
                    sorted.push(child);
                }
            }
            generations[y] = sorted;
            generations[y].forEach((species, x) => {
                if (!(species.id in this.rendered_species)) {
                    let pos_x = x * slot + 5;
                    let pos_y = 5 + y * 35;
                    this.rendered_species[species.id] = [pos_x, pos_y];
                    ctx.fillRect(pos_x, pos_y, 3, 3);
                    if (species.parent !== null) {
                        let [parent_x, parent_y] = this.rendered_species[species.parent.id];
                        ctx.moveTo(pos_x + 1, pos_y + 1);
                        ctx.lineTo(parent_x + 1, parent_y + 1);
                        ctx.stroke();
                    }
                }
            });
        });

    }
}

