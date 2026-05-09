import { useState } from 'react';
import { useMatrixActions } from '../../hooks/useMatrixActions';
import { MAX_COLUMNS, MAX_ROWS } from '../../constants/matrixConfig';
import styles from './Controls.module.css';
import { useMatrixData } from '../../hooks/useMatrixData';

export function Controls() {
	const [rows, setRows] = useState<number | null>(null);
	const [columns, setColumns] = useState<number | null>(null);
	const { generateMatrix, addRow } = useMatrixActions();
	const { matrix } = useMatrixData();

	const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		generateMatrix(Number(rows), Number(columns));
		setRows(null);
		setColumns(null);
	};

	return (
		<div>
			<form onSubmit={handleSubmit} className={styles.container}>
				<label htmlFor='rows'>Rows:</label>
				<input
					id='rows'
					name='rows'
					type='number'
					value={rows ?? ''}
					max={MAX_ROWS}
					onChange={(e) => setRows(parseInt(e.target.value) || 0)}
				/>
				<label htmlFor='columns'>Columns:</label>
				<input
					id='columns'
					name='columns'
					type='number'
					value={columns ?? ''}
					max={MAX_COLUMNS}
					onChange={(e) => setColumns(parseInt(e.target.value) || 0)}
				/>
				<button type='submit' disabled={!rows || !columns}>
					Generate Matrix
				</button>
				{matrix.length > 0 && (
					<button type='button' onClick={addRow}>
						Add row
					</button>
				)}
			</form>
		</div>
	);
}
