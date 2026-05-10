import { useMemo, useState } from 'react';
import { useMatrixData } from '../../hooks/useMatrixData';
import { MatrixRow } from '../MatrixRow';
import { getPercentile } from '../../utils/getPercentile';
import { DEBOUNCE_DELAY, PERCENTILE } from '../../constants/matrixConfig';
import styles from './MatrixTable.module.css';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';

export function MatrixTable() {
	const { matrix, columnCount } = useMatrixData();
	const [hoveredCellId, setHoveredCellId] = useState<number | null>(null);
	const debouncedHoveredCellId = useDebouncedValue(hoveredCellId, DEBOUNCE_DELAY);

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
				.slice(0, hoveredCell.amount)
				.map((cell) => cell.id),
		);
	}, [allCells, hoveredCell]);

	return (
		<div className={styles.container}>
			<table className={styles.table}>
				<tbody>
					{matrix.map((row) => (
						<MatrixRow row={row} key={row.id} nearestCellIds={nearestCellIds} setHoveredCellId={setHoveredCellId} />
					))}
				</tbody>
				<tfoot>
					<tr>
						{columnPercentiles.map((percentile, index) => (
							<td key={index} className={styles.columnPercentile}>
								{percentile}
							</td>
						))}
					</tr>
				</tfoot>
			</table>
		</div>
	);
}
