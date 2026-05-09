import { memo } from 'react';
import type { Cell } from '../types/Matrix';

interface Props {
	cell: Cell;
}

const CellComponent = ({ cell }: Props) => {
	return (
		<td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
			ID: {cell.id}, Value: {cell.amount}
		</td>
	);
};

export const MatrixCell = memo(CellComponent);
