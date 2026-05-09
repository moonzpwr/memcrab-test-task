import { useContext } from 'react';
import { MatrixActionsContext } from '../context/ActionsContext';

export const useMatrixActions = () => {
	const context = useContext(MatrixActionsContext);

	if (!context) {
		throw new Error('useMatrixActions must be used within MatrixProvider');
	}

	return context;
};
