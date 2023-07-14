import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage/HomePage'
import '/App.css'
import SearchPage from './pages/SearchPage/SearchPage'
import ChatPage from './pages/ChatPage/ChatPage'
import FavoritePage from './pages/FavoritePage/FavoritePage'
export default function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route index path='/' element={<HomePage />} />
					<Route path='/search/:city' element={<SearchPage />} />
					<Route path='/favorites' element={<FavoritePage />} />
					<Route path='/chat/:attractionId' element={<ChatPage />} />
				</Routes>
			</Router>
		</>
	)
}
