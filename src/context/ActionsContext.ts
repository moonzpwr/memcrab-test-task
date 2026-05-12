import { createContext } from 'react';

type MatrixActionsContextValue = {
	addRow: () => void;
	removeRow: (rowIndex: number) => void;
	generateMatrix: (rows: number, columns: number) => void;
	incrementCell: (cellId: number) => void;
	setX: (x: number) => void;
};

export const MatrixActionsContext = createContext<MatrixActionsContextValue | null>(null);
