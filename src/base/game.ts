import Bot from '../bot/bot';
import Dashboard from '../reporting/dashboard';

export default class GeneticGame extends Phaser.Game {
    data: Bot[][];
    target: any;
    bot_brain_size: number;
    population: number;
    current_generation: number;
    current_species: number;
    species: Bot[];
    dashboard: Dashboard;
}
