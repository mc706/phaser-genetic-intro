import GeneticState from '../base/state';

export default class Boot extends GeneticState{
    public preload(): void {

    }

    public create(): void {

        this.game.state.start('load');
    }
}