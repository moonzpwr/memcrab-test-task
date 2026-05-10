import { memo } from 'react';

interface Props {
	cellAmount: number;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
}

const SumCellComponent = ({ cellAmount, onMouseEnter, onMouseLeave }: Props) => {
	return (
		<td
			style={{
				border: '1px solid #ccc',
				padding: '8px',
				textAlign: 'center',
			}}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			Sum: {cellAmount}
		</td>
	);
};

export const SumCell = memo(SumCellComponent);
