import { useCallback, useRef, useState } from 'react';
import type { Matrix, Row } from '../types/Matrix';
import { randomValue } from '../utils/generateRandomValue';
import { MatrixDataContext } from './DataContext';
import { MatrixActionsContext } from './ActionsContext';
import { createMatrix } from '../utils/createMatrix';

export function MatrixProvider({ children }: { children: React.ReactNode }) {
	const [matrix, setMatrix] = useState<Matrix>([]);
	const [columnCount, setColumnCount] = useState(0);
	const nextCellIdRef = useRef<number>(1);
	const nextRowIdRef = useRef<number>(1);

	const addRow = useCallback(() => {
		const rowId = nextRowIdRef.current;
		nextRowIdRef.current += 1;

		const cells = Array.from({ length: columnCount }, () => {
			const cellId = nextCellIdRef.current;
			nextCellIdRef.current += 1;

			return {
				id: cellId,
				amount: randomValue(),
			};
		});
		console.log('Adding row with ID:', rowId, 'and cells:', cells);

		const row: Row = {
			id: rowId,
			cells,
		};

		setMatrix((prev) => [...prev, row]);
	}, [columnCount]);

	const removeRow = useCallback((rowId: number) => {
		setMatrix((prev) => prev.filter((row) => row.id !== rowId));
	}, []);

	const generateMatrix = useCallback((rows: number, columns: number) => {
		const result = createMatrix(rows, columns, 1, 1);
		setColumnCount(result.matrix[0]?.cells.length ?? 0);
		nextCellIdRef.current = result.nextCellId;
		nextRowIdRef.current = result.nextRowId;

		setMatrix(result.matrix);
	}, []);

	return (
		<MatrixActionsContext.Provider value={{ addRow, removeRow, generateMatrix }}>
			<MatrixDataContext.Provider value={{ matrix, columnCount }}>{children}</MatrixDataContext.Provider>
		</MatrixActionsContext.Provider>
	);
}
