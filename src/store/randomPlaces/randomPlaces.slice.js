import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	randomPlaces: [],
	isLoading: false,
	error: null
}

const randomPlacesSlice = createSlice({
	name: 'randomPlaces',
	initialState,
	reducers: {
		setRandomPlaces: (state, action) => {
			state.randomPlaces = action.payload
		},
		setLoading: (state, action) => {
			state.isLoading = action.payload
		},
		setError: (state, action) => {
			state.error = action.payload
		}
	}
})

export const { setRandomPlaces, setLoading, setError } =
	randomPlacesSlice.actions
export const randomPlacesReducer = randomPlacesSlice.reducer
