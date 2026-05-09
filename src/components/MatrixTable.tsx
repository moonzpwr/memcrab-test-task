import { useMemo } from 'react';
import { useMatrixData } from '../hooks/useMatrixData';
import { MatrixRow } from './MatrixRow';
import { getPercentile } from '../utils/getPercentile';
import { PERCENTILE } from '../constants/matrixConfig';

export function MatrixTable() {
	const { matrix, columnCount } = useMatrixData();

	const columnPercentiles = useMemo(() => {
		if (!matrix.length) {
			return [];
		}

		return Array.from({ length: columnCount }, (_, columnIndex) => {
			const values = matrix.map((row) => row.cells[columnIndex].amount);

			return getPercentile(values, PERCENTILE);
		});
	}, [matrix, columnCount]);

	return (
		<div style={{ display: 'flex', overflowX: 'auto', whiteSpace: 'nowrap', width: '100%' }}>
			<table style={{ borderCollapse: 'collapse', flex: '0 0 auto', marginLeft: 'auto', marginRight: 'auto' }}>
				<tbody>
					{matrix.map((row) => (
						<MatrixRow row={row} key={row.id} />
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
