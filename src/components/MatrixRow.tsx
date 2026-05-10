import { memo, useCallback, useMemo, useState } from 'react';
import type { Row } from '../types/Matrix';
import { MatrixCell } from './MatrixCell';
import { useMatrixActions } from '../hooks/useMatrixActions';
import { SumCell } from './SumCell';

interface Props {
	row: Row;
	nearestCellIds: Set<number>;
	setHoveredCellId: (cellId: number | null) => void;
}

const RowComponent = ({ row, nearestCellIds, setHoveredCellId }: Props) => {
	const { removeRow } = useMatrixActions();
	const [hoveredSumRowId, setHoveredSumRowId] = useState<number | null>(null);

	const isRowHovered = useMemo(() => hoveredSumRowId === row.id, [hoveredSumRowId, row.id]);
	const onSumHover = useCallback((rowId: number | null) => setHoveredSumRowId(rowId), [setHoveredSumRowId]);

	const rowSum = useMemo(() => {
		return row.cells.reduce((sum, cell) => sum + cell.amount, 0);
	}, [row.cells]);

	const calculatedCells = useMemo(() => {
		const maxValue = Math.max(...row.cells.map((cell) => cell.amount));

		return row.cells.map((cell) => ({
			cell,
			percentage: (cell.amount / rowSum) * 100,
			heatmap: (cell.amount / maxValue) * 100,
		}));
	}, [row.cells, rowSum]);

	return (
		<tr>
			{calculatedCells.map(({ cell, percentage, heatmap }) => (
				<MatrixCell
					cell={cell}
					key={cell.id}
					isRowHovered={isRowHovered}
					percentage={percentage}
					heatmap={heatmap}
					isHighlighted={nearestCellIds.has(cell.id)}
					onMouseEnter={() => setHoveredCellId(cell.id)}
					onMouseLeave={() => setHoveredCellId(null)}
				/>
			))}
			<SumCell cellAmount={rowSum} onMouseEnter={() => onSumHover(row.id)} onMouseLeave={() => onSumHover(null)} />
			<td>
				rowID:{row.id} <button onClick={() => removeRow(row.id)}>Remove</button>
			</td>
		</tr>
	);
};

export const MatrixRow = memo(RowComponent);
