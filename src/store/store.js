import { configureStore } from '@reduxjs/toolkit'
import { locationsReducer } from './locations/locations.slice'
import { favoritesReducer } from './favorites/favorites.slice';
import { randomPlacesReducer } from './randomPlaces/randomPlaces.slice';

export const store = configureStore({
	reducer: {
		locations: locationsReducer,
		favorites: favoritesReducer,
		randomPlaces: randomPlacesReducer
	}
})
