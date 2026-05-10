import { memo } from 'react';
import type { Cell } from '../types/Matrix';
import { useMatrixActions } from '../hooks/useMatrixActions';

interface Props {
	cell: Cell;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
	isRowHovered?: boolean;
	percentage?: number;
	heatmap?: number;
	isClickable?: boolean;
}

const CellComponent = ({ cell, onMouseEnter, onMouseLeave, isRowHovered, percentage, heatmap }: Props) => {
	const { incrementCell } = useMatrixActions();

	return (
		<td
			style={{
				border: '1px solid #ccc',
				padding: '8px',
				textAlign: 'center',
				userSelect: 'none',
				background:
					heatmap && isRowHovered
						? `linear-gradient(90deg, tomato ${heatmap}%, transparent ${heatmap}%)`
						: 'transparent',
			}}
			onClick={() => incrementCell(cell.id)}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			ID: {cell.id}, Value: {isRowHovered && percentage ? `${Math.round(percentage)}%` : cell.amount}
		</td>
	);
};

export const MatrixCell = memo(CellComponent);
