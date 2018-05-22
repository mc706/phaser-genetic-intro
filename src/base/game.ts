import Bot from '../bot/bot';

export default class GeneticGame extends Phaser.Game {
    data: any;
    target: any;
    bot_brain_size: number;
    population: number;
    current_generation: number;
    current_species: number;
    species: Bot[];
}
