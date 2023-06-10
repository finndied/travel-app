import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Header } from '../../components/Header/Header'
import {
	fetchLocations,
	fetchMoreLocations
} from '../../store/locations/locations.slice'

const SearchPage = () => {
	const cityName = useSelector(state => state.locations.cityName)
	const places = useSelector(state => state.locations.places)
	const offset = useSelector(state => state.locations.offset)
	const dispatch = useDispatch()

	const handleShowMore = () => {
		dispatch(fetchMoreLocations({ cityName, offset }))
	}

	return (
		<>
			{/* <Header/> */}
			<h1>Search Results for {cityName}</h1>
			{places.length > 0 ? (
				<>
					{places.map(place => (
						<div key={place.xid}>
							<h2>Name: {place.name}</h2>
							<p>Address: {place.address.road}</p>
							<p>{place.address.neighbourhood}</p>
							<img
								src={place.preview}
								alt={place.name}
								width='200px'
								height='150px'
							/>
						</div>
					))}

					<button onClick={handleShowMore}>Show More</button>
				</>
			) : (
				<p>No places found.</p>
			)}
			{console.log('эщкере', places)}
			<Link to='/'>Go Back</Link>
		</>
	)
}

export default SearchPage
