// Convert degrees to radians. Math.{sin,cos} take radians
import Bot from '../bot/bot';

export const degToRad = (degrees: number) => degrees / 180 * Math.PI;

// Get random number in between `min` and `max`
export const getRandomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

// Get random angle.
export const getRandomAngle = () => getRandomInRange(-179, 180);

export const getPercentageChance = (percent: number) => percent >= getRandomInRange(0, 100);

// Helper function for guids
const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);

// generate random guid
export const guid = () => `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;

// Pretty Floats
export const prettyNum = (n: number) => (Math.round(n * 100) / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const hsv2rgb = function (h: number, s: number, v: number): string {
    // adapted from http://schinckel.net/2012/01/10/hsv-to-rgb-in-javascript/
    let rgb, i, data = [];
    if (s === 0) {
        rgb = [v, v, v];
    } else {
        h = h / 60;
        i = Math.floor(h);
        data = [v * (1 - s), v * (1 - s * (h - i)), v * (1 - s * (1 - (h - i)))];
        switch (i) {
            case 0:
                rgb = [v, data[2], data[0]];
                break;
            case 1:
                rgb = [data[1], v, data[0]];
                break;
            case 2:
                rgb = [data[0], v, data[2]];
                break;
            case 3:
                rgb = [data[0], data[1], v];
                break;
            case 4:
                rgb = [data[2], data[0], v];
                break;
            default:
                rgb = [v, data[0], data[1]];
                break;
        }
    }
    return '#' + rgb.map(function (x) {
        return ('0' + Math.round(x * 255).toString(16)).slice(-2);
    }).join('');
};

export const redToGreenSpectrum = (percent: number) => {
    let h = Math.floor(percent * 120 / 100);
    let s = Math.abs(percent - 50) / 50;
    let v = 1;
    return hsv2rgb(h, s, v);
};

const maxFitness = (a: number, c: Bot) => a > c.fitness ? a : c.fitness;
const sumFitness = (a: number, c: Bot) => a + c.fitness;
const minFitness = (a: number, c: Bot) => a < c.fitness ? a : c.fitness;
export const generationMaxFit = (gen: Bot[]) => gen.reduce(maxFitness, 0);
export const generationAvgFit = (gen: Bot[]) => gen.reduce(sumFitness, 0) / gen.length;
export const generationMinFit = (gen: Bot[]) => gen.reduce(minFitness, Infinity);

export const buildPercentile = (min: number, max: number) => (val: number) => Math.floor((val - min) / (max - min) * 100);
