import { memo } from 'react';
import type { Cell } from '../../types/Matrix';
import { useMatrixActions } from '../../hooks/useMatrixActions';
import styles from './MatrixCell.module.css';

interface Props {
	cell: Cell;
	onMouseEnter: () => void;
	onMouseLeave: () => void;
	isRowHovered: boolean;
	percentage: number;
	heatmap: number;
	isHighlighted: boolean;
}

const CellComponent = ({
	cell,
	onMouseEnter,
	onMouseLeave,
	isRowHovered,
	percentage,
	heatmap,
	isHighlighted,
}: Props) => {
	const { incrementCell } = useMatrixActions();
	const opacity = 0.15 + (heatmap / 100) * 0.85;

	return (
		<td
			className={`${styles.cell} ${isHighlighted ? styles.highlightedCell : ''}`}
			style={{ backgroundColor: isRowHovered ? `rgba(255, 99, 71, ${opacity})` : undefined }}
			onClick={() => incrementCell(cell.id)}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			{isRowHovered ? `${Math.round(percentage)}%` : cell.amount}
		</td>
	);
};

export const MatrixCell = memo(CellComponent);
