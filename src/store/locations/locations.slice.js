import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const apiKey = '5ae2e3f221c38a28845f05b6db9289dd3349958b5de9ebed5c40c94e'
const pageLength = 60

// Function to fetch places data from the API
const fetchPlaces = async (cityName, offset) => {
	try {
		// Fetch geolocation data for the city
		const response = await axios.get(
			`https://api.opentripmap.com/0.1/en/places/geoname?name=${cityName}&apikey=${apiKey}`
		)
		const { lat, lon } = response.data

		// Fetch places within a radius around the city
		const radiusResponse = await axios.get(
			`https://api.opentripmap.com/0.1/en/places/radius?lat=${lat}&lon=${lon}&radius=1000&limit=${pageLength}&offset=${offset}&apikey=${apiKey}`
		)
		const placesData = radiusResponse.data

		let places = []

		// Loop through the retrieved places and fetch more details for each place
		for (const place of placesData.features) {
			await new Promise(resolve => setTimeout(resolve, 100))

			const xid = place.properties.xid
			const placeResponse = await axios.get(
				`https://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=${apiKey}`
			)
			const placeData = placeResponse.data
			console.log('placeData:', placeData)

			if (placeData.name !== undefined && placeData.name.trim() !== '') {
				const placeObj = {
					xid: placeData.xid,
					name: placeData.name,
					info: placeData.info,
					rate: placeData.rate,
					preview: placeData.preview && placeData.preview.source,
					address: placeData.address
				}

				places.push(placeObj)

				if (places.length >= 10) {
					break
				}
			}
		}
		return places
	} catch (error) {
		throw error.response.data
	}
}

// Async thunk to fetch locations data for the specified city
export const fetchLocations = createAsyncThunk(
	'locations/fetchLocations',
	async ({ cityName }, { rejectWithValue }) => {
		try {
			// Fetch the initial batch of places
			const places = await fetchPlaces(cityName, 0)
			return { cityName, places, offset: pageLength }
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

// Async thunk to fetch more locations data for the specified city
export const fetchMoreLocations = createAsyncThunk(
	'locations/fetchMoreLocations',
	async ({ cityName, offset }, { rejectWithValue }) => {
		try {
			// Fetch more places based on the offset
			const places = await fetchPlaces(cityName, offset)
			return { cityName, places }
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

const initialState = {
	places: [],
	cityName: '',
	preview: {},
	isLoading: false,
	error: null,
	offset: 0
}

const locationsSlice = createSlice({
	name: 'locations',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchLocations.pending, state => {
				state.isLoading = true
				state.error = null
				state.places = []
				state.preview = {}
				state.offset = 0
			})
			.addCase(fetchLocations.fulfilled, (state, action) => {
				state.isLoading = false
				state.error = null
				state.preview = action.payload.preview
				state.cityName = action.payload.cityName
				state.places = action.payload.places
				state.offset = action.payload.offset
			})
			.addCase(fetchLocations.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload
				state.places = []
				state.offset = 0
			})
			.addCase(fetchMoreLocations.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(fetchMoreLocations.fulfilled, (state, action) => {
				state.isLoading = false
				state.error = null
				state.places = state.places.concat(action.payload.places)
				state.offset = state.offset + pageLength
			})
			.addCase(fetchMoreLocations.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload
			})
	}
})

export default locationsSlice.reducer

export const locationsReducer = locationsSlice.reducer
