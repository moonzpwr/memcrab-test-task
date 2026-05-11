import type { Matrix } from '../types/Matrix';
import { randomValue } from './randomValue';

interface CreateMatrixResult {
	matrix: Matrix;
	nextCellId: number;
	nextRowId: number;
}

export const createMatrix = (rows: number, columns: number): CreateMatrixResult => {
	let nextCellId = 1;
	let nextRowId = 1;

	const matrix: Matrix = Array.from({ length: rows }, () => ({
		id: nextRowId++,
		cells: Array.from({ length: columns }, () => ({
			id: nextCellId++,
			amount: randomValue(),
		})),
	}));

	return {
		matrix,
		nextCellId,
		nextRowId,
	};
};
