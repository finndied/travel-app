import { configureStore } from '@reduxjs/toolkit'
import { locationsReducer } from './locations/locations.slice'
import { favoritesReducer } from './favorites/favorites.slice';

export const store = configureStore({
	reducer: {
		locations: locationsReducer,
		favorites: favoritesReducer,
	}
})
