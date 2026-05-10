import { memo } from 'react';
import { useMatrixActions } from '../../hooks/useMatrixActions';
import DeleteSvg from '../../assets/delete.svg?react';
import styles from './SumCell.module.css';

interface Props {
	cellAmount: number;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
	rowId: number;
}

const SumCellComponent = ({ cellAmount, onMouseEnter, onMouseLeave, rowId }: Props) => {
	const { removeRow } = useMatrixActions();

	return (
		<td className={styles.sumCell} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
			Sum: {cellAmount}
			<button onClick={() => removeRow(rowId)} className={styles.button}>
				<DeleteSvg className={styles.deleteSvg} />
			</button>
		</td>
	);
};

export const SumCell = memo(SumCellComponent);
