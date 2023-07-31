import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	favorites: []
}

const favoritesSlice = createSlice({
	name: 'favorites',
	initialState,
	reducers: {
		addToFavorites: (state, action) => {
			// Reducer to add an item to favorites
			const { xid, name, address, preview } = action.payload
			const favorite = { xid, name, address, preview }
			state.favorites.push(favorite)
		},
		removeFromFavorites: (state, action) => {
			// Reducer to remove an item from favorites
			const { xid } = action.payload
			state.favorites = state.favorites.filter(favorite => favorite.xid !== xid)
		}
	}
})

export const favoritesReducer = favoritesSlice.reducer
export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions
