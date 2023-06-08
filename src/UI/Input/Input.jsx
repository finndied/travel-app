import React, { useState } from 'react'
import styles from './Input.module.scss'
import { useDispatch } from 'react-redux'
import { fetchLocations } from '../../store/locations/locations.slice'
import { Link } from 'react-router-dom'

export const Input = () => {
	const dispatch = useDispatch()
	const [cityName, setCityName] = useState('')

	const handleSearch = () => {
		if (cityName.trim() !== '') {
			dispatch(fetchLocations({ cityName }))
		}
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.inputWrapper}>
				<input
					type='text'
					className={styles.input}
					placeholder='Where are you looking for?'
					value={cityName}
					onChange={e => setCityName(e.target.value)}
				/>
				<Link
					to={`/search/${cityName}`}
					className={styles.button}
					onClick={handleSearch}
					type="submit"
				>
					Explore
				</Link>
			</div>
		</div>
	)
}
