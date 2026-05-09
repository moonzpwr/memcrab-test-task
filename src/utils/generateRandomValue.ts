import { MAX_VALUE, MIN_VALUE } from '../constants/matrixConfig';

export const randomValue = () => Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1)) + MIN_VALUE;
