import { useEffect, useMemo, useState } from 'react';
import { useMatrixData } from '../hooks/useMatrixData';
import { MatrixRow } from './MatrixRow';
import { getPercentile } from '../utils/getPercentile';
import { DEBOUNCE_DELAY, PERCENTILE } from '../constants/matrixConfig';

export function MatrixTable() {
	const { matrix, columnCount } = useMatrixData();
	const [hoveredCellId, setHoveredCellId] = useState<number | null>(null);
	const [debouncedHoveredCellId, setDebouncedHoveredCellId] = useState<number | null>(null);

	useEffect(() => {
		if (hoveredCellId === null) {
			setDebouncedHoveredCellId(null);
			return;
		}

		const timeout = setTimeout(() => {
			setDebouncedHoveredCellId(hoveredCellId);
		}, DEBOUNCE_DELAY);

		return () => clearTimeout(timeout);
	}, [hoveredCellId]);

	const columnPercentiles = useMemo(() => {
		if (!matrix.length) {
			return [];
		}

		return Array.from({ length: columnCount }, (_, columnIndex) => {
			const values = matrix.map((row) => row.cells[columnIndex].amount);

			return getPercentile(values, PERCENTILE);
		});
	}, [matrix, columnCount]);

	const allCells = useMemo(() => {
		return matrix.flatMap((row) => row.cells);
	}, [matrix]);

	const hoveredCell = useMemo(() => {
		return allCells.find((cell) => cell.id === debouncedHoveredCellId);
	}, [allCells, debouncedHoveredCellId]);

	const nearestCellIds = useMemo(() => {
		if (!hoveredCell) {
			return new Set<number>();
		}

		return new Set(
			allCells
				.filter((cell) => cell.id !== hoveredCell.id)
				.map((cell) => ({
					id: cell.id,
					distance: Math.abs(cell.amount - hoveredCell.amount),
				}))
				.sort((a, b) => a.distance - b.distance)
				// .slice(0, hoveredCell.amount)
				.slice(0, 3) //TODO: change
				.map((cell) => cell.id),
		);
	}, [allCells, hoveredCell]);

	return (
		<div style={{ display: 'flex', overflowX: 'auto', whiteSpace: 'nowrap', width: '100%' }}>
			<table style={{ borderCollapse: 'collapse', flex: '0 0 auto', marginLeft: 'auto', marginRight: 'auto' }}>
				<tbody>
					{matrix.map((row) => (
						<MatrixRow row={row} key={row.id} nearestCellIds={nearestCellIds} setHoveredCellId={setHoveredCellId} />
					))}
				</tbody>
				<tfoot>
					<tr>
						{columnPercentiles.map((percentile, index) => (
							<td key={index} style={{ border: '1px solid #ccc', padding: '8px' }}>
								{percentile}
							</td>
						))}
					</tr>
				</tfoot>
			</table>
		</div>
	);
}
