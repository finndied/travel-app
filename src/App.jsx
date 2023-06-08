import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage/HomePage'
import '/App.css'
import SearchPage from './pages/SearchPage/SearchPage'
export default function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route index path='/' element={<HomePage />} />
					<Route path='/search/:city' element={<SearchPage />} />
				</Routes>
			</Router>
		</>
	)
}
