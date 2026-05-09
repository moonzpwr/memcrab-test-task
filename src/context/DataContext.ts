import { createContext } from 'react';
import type { Matrix } from '../types/Matrix';

type MatrixDataContext = {
	matrix: Matrix;
	columnCount: number;
};

export const MatrixDataContext = createContext<MatrixDataContext | null>(null);
