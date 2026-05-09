import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { MatrixProvider } from './context/MatrixProvider.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<MatrixProvider>
			<App />
		</MatrixProvider>
	</StrictMode>,
);
