import { memo, useMemo } from 'react';
import type { Row } from '../types/Matrix';
import { MatrixCell } from './MtrixCell';
import { useMatrixActions } from '../hooks/useMatrixActions';
import { MAX_ROWS } from '../constants/matrixConfig';

interface Props {
	row: Row;
}

const RowComponent = ({ row }: Props) => {
	const { removeRow } = useMatrixActions();

	const rowSum = useMemo(() => {
		return row.cells.reduce((sum, cell) => sum + cell.amount, 0);
	}, [row]);

	return (
		<tr>
			{row.cells.map((cell) => (
				<MatrixCell cell={cell} key={cell.id} />
			))}
			<MatrixCell cell={{ amount: rowSum, id: row.id + MAX_ROWS }} />
			<td>
				rowID:{row.id} <button onClick={() => removeRow(row.id)}>Remove</button>
			</td>
		</tr>
	);
};

export const MatrixRow = memo(RowComponent);
