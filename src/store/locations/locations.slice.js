import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const apiKey = '5ae2e3f221c38a28845f05b6db9289dd3349958b5de9ebed5c40c94e'
const pageLength = 50
const offset = 0

export const fetchLocations = createAsyncThunk(
	'locations/fetchLocations',
	async ({ cityName }, { getState, rejectWithValue }) => {
		try {
			const response = await axios.get(
				`https://api.opentripmap.com/0.1/en/places/geoname?name=${cityName}&apikey=${apiKey}`
			)
			const { lat, lon } = response.data

			const radiusResponse = await axios.get(
				`https://api.opentripmap.com/0.1/en/places/radius?lat=${lat}&lon=${lon}&radius=1000&limit=${pageLength}&offset=${offset}&apikey=${apiKey}`
			)
			const placesData = radiusResponse.data

			let places = []

			for (const place of placesData.features) {
				await new Promise(resolve => setTimeout(resolve, 100)) // Задержка перед каждым запросом

				const xid = place.properties.xid
				const placeResponse = await axios.get(
					`https://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=${apiKey}`
				)
				const placeData = placeResponse.data
				console.log('placeData:', placeData)

				if (placeData.preview && placeData.preview.source) {
					const placeObj = {
						xid: placeData.xid,
						name: placeData.name,
						rate: placeData.rate,
						preview: placeData.preview.source,
						address: placeData.address
					}

					places.push(placeObj)

					// Проверка на достижение желаемого количества результатов
					if (places.length >= 10) {
						break
					}
				}
			}

			return { cityName, places }
		} catch (error) {
			return rejectWithValue(error.response.data)
		}
	}
)

const initialState = {
	data: [],
	places: [],
	cityName: '',
	rate: '',
	name: '',
	preview: {},
	address: '',
	isLoading: false,
	error: null,
	page: 1
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
				state.data = []
				state.preview = {}
				state.places = []
				state.cityName = ''
				state.rate = ''
				state.address = ''
			})
			.addCase(fetchLocations.fulfilled, (state, action) => {
				state.isLoading = false
				state.error = null
				state.data = action.payload.data
				state.cityName = action.payload.cityName
				state.places = action.payload.places
				state.preview = action.payload.preview
				state.address = action.payload.address
				state.name = action.payload.name
				state.rate = action.payload.rate
			})
			.addCase(fetchLocations.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload
				state.data = []
				state.places = []
				state.cityName = action.meta.arg.cityName
			})
	}
})

export default locationsSlice.reducer

export const locationsReducer = locationsSlice.reducer
