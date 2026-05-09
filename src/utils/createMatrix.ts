import type { Matrix } from '../types/Matrix';
import { randomValue } from './generateRandomValue';

interface CreateMatrixResult {
	matrix: Matrix;
	nextCellId: number;
	nextRowId: number;
}

export const createMatrix = (
	rows: number,
	columns: number,
	startCellId: number,
	startRowId: number,
): CreateMatrixResult => {
	let nextCellId = startCellId;
	let nextRowId = startRowId;

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
