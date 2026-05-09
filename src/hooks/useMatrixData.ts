import { useContext } from 'react';
import { MatrixDataContext } from '../context/DataContext';

export const useMatrixData = () => {
	const context = useContext(MatrixDataContext);

	if (!context) {
		throw new Error('useMatrixData must be used within MatrixProvider');
	}

	return context;
};
