export const degToRad = (degrees: number) => degrees / 180 * Math.PI;

export const getRandomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

export const getRandomAngle = () => getRandomInRange(-179, 180);