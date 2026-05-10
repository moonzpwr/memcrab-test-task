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

	return (
		<td
			className={`${styles.cell} ${isHighlighted ? styles.highlightedCell : ''}`}
			style={{
				background: isRowHovered
					? `linear-gradient(90deg, tomato ${heatmap}%, transparent ${heatmap}%)`
					: 'transparent',
			}}
			onClick={() => incrementCell(cell.id)}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			{isRowHovered ? `${Math.round(percentage)}%` : cell.amount}
		</td>
	);
};

export const MatrixCell = memo(CellComponent);
