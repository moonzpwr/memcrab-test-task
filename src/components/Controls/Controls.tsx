import { useState } from 'react';
import { useMatrixActions } from '../../hooks/useMatrixActions';
import { MAX_COLUMNS, MAX_ROWS } from '../../constants/matrixConfig';
import styles from './Controls.module.css';
import { useMatrixData } from '../../hooks/useMatrixData';

export function Controls() {
	const [rows, setRows] = useState<number | null>(null);
	const [columns, setColumns] = useState<number | null>(null);
	const { generateMatrix, addRow, setX } = useMatrixActions();
	const { matrix, x } = useMatrixData();

	const isGenerateButtonDisabled = !rows || !columns || rows <= 0 || columns <= 0;

	const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		generateMatrix(Number(rows), Number(columns));
		setRows(null);
		setColumns(null);
	};

	const handleXChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newX = parseInt(e.target.value) || 0;
		if (newX < 0 || newX > MAX_COLUMNS * MAX_ROWS) {
			setX(MAX_COLUMNS * MAX_ROWS);
		} else {
			setX(newX);
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit} className={styles.container}>
				<div className={styles.inputsGroup}>
					<label htmlFor='rows'>Rows:</label>
					<input
						id='rows'
						name='rows'
						type='number'
						value={rows ?? ''}
						max={MAX_ROWS}
						onChange={(e) => setRows(parseInt(e.target.value) || 0)}
						className={styles.input}
					/>
					<label htmlFor='columns'>Columns:</label>
					<input
						id='columns'
						name='columns'
						type='number'
						value={columns ?? ''}
						max={MAX_COLUMNS}
						onChange={(e) => setColumns(parseInt(e.target.value) || 0)}
						className={styles.input}
					/>
					<label htmlFor='x'>X:</label>
					<input id='x' name='x' type='number' value={x ?? ''} onChange={handleXChange} className={styles.input} />
				</div>
				<div className={styles.buttonsGroup}>
					<button type='submit' disabled={isGenerateButtonDisabled} className={styles.button}>
						Generate Matrix
					</button>
					{matrix.length > 0 && (
						<button type='button' onClick={addRow} className={styles.button}>
							Add row
						</button>
					)}
				</div>
			</form>
		</div>
	);
}
