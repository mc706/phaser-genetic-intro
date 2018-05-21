import 'p2';
import 'pixi';
import 'phaser';

import GeneticGame from './base/game';
import Boot from './states/boot';
import Load from './states/load';
import Main from './states/main';
import Analyse from './states/analyse';

class App extends GeneticGame {
    constructor(config: Phaser.IGameConfig) {
        super(config);

        this.bot_brain_size = BRAIN_SIZE;
        this.population = POPULATION;
        this.current_generation = 0;
        this.species = [];
        this.current_species = 0;

        this.state.add('boot', Boot);
        this.state.add('load', Load);
        this.state.add('main', Main);
        this.state.add('analyse', Analyse);


        this.state.start('boot');
    }
}

function startApp(): void {
    let gameConfig: Phaser.IGameConfig = {
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
        renderer: Phaser.AUTO,
        parent: '',
        resolution: 1,
    };

    let app = new App(gameConfig);
}

window.onload = () => {
    startApp();
};
