// Convert degrees to radians. Math.{sin,cos} take radians
export const degToRad = (degrees: number) => degrees / 180 * Math.PI;

// Get random number in between `min` and `max`
export const getRandomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

// Get random angle.
export const getRandomAngle = () => getRandomInRange(-179, 180);

export const getPercentageChance = (percent: number) =>  percent >= getRandomInRange(0, 100);

// Helper function for guids
const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);

// generate random guid
export const guid = () => `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
