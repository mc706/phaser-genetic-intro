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

        this.state.add('boot', Boot);
        this.state.add('load', Load);
        this.state.add('main', Main);
        this.state.add('analyse', Analyse);


        this.state.start('boot');
    }
}

function startApp(): void {
    let width: number = 800;
    let height: number = 800;

    let gameConfig: Phaser.IGameConfig = {
        width,
        height,
        renderer: Phaser.AUTO,
        parent: '',
        resolution: 1,
    };

    let app = new App(gameConfig);
}

window.onload = () => {
    startApp();
};
