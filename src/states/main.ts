import GeneticState from '../base/state';

export default class Main extends GeneticState {

    public update(): void {
        for (let species of this.game.species) {
            species.move();
        }
        if (this.game.species.every((s) => s.isDead)) {
            this.game.state.start('analyse');
        }
    }

    public render(): void {
        this.game.context.fillStyle = 'rgb(0,255,0)';
        this.game.context.fillRect(this.game.target.x, this.game.target.y, 8, 8);
        for (let species of this.game.species) {
            species.show();
        }
    }
}
