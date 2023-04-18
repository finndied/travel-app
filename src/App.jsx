import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage/HomePage'

export default function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route index path='/' element={<HomePage />} />
				</Routes>
			</Router>
		</>
	)
}
