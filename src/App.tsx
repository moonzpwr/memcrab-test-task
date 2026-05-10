import { Controls } from './components/Controls/Controls';
import { MatrixTable } from './components/MatrixTable/MatrixTable';
import styles from './App.module.css';

function App() {
	return (
		<div className={styles.container}>
			<Controls />
			<MatrixTable />
		</div>
	);
}

export default App;
