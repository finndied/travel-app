import { Header } from '../../components/Header/Header'
import styles from './HomePage.module.scss'
import { Input } from '../../UI/Input/Input'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchLocations } from '../../store/locations/locations.slice'
import {
	setLoading,
	setError
} from '../../store/randomPlaces/randomPlaces.slice'
import { ImArrowRight2, ImMap2 } from 'react-icons/im'
import placeholderImage from '../../assets/images/no-image.jpg'
import background1 from '../../assets/images/background1.jpg';
import { Link } from 'react-router-dom'
import MyLoader from '../../components/MyLoader/MyLoader'
import { cities } from './cities'

export const HomePage = () => {
	const locations = useSelector(state => state.locations)
	const randomPlaces = useSelector(state => state.randomPlaces.randomPlaces)
	const dispatch = useDispatch()

	const [city, setCity] = useState('')

	const getRandomCity = () => {
		const randomIndex = Math.floor(Math.random() * cities.length)
		return cities[randomIndex]
	}

	const [visiblePlaces, setVisiblePlaces] = useState([])
	const [currentIndex, setCurrentIndex] = useState(0)
	const [randomPlacesLoaded, setRandomPlacesLoaded] = useState(false)
	const attractionsPerPage = 3

	useEffect(() => {
		if (!randomPlaces.length) {
			// Fetch random places if randomPlaces array is empty
			const cityName = getRandomCity()
			dispatch(setLoading(true))
			dispatch(fetchLocations({ cityName }))
				.then(({ payload }) => {
					dispatch(setLoading(false))
					dispatch(setError(null))
					setRandomPlacesLoaded(true)
				})
				.catch(error => {
					dispatch(setError(error))
					dispatch(setLoading(false))
				})
		}
	}, [randomPlaces.length, dispatch])

	// Function to open Google Maps for a place
	const openGoogleMaps = attraction => {
		const attractionName = attraction.name
		const url = `https://www.google.com/maps?q=${encodeURIComponent(
			attractionName
		)}`
		window.open(url, '_blank')
	}

	useEffect(() => {
		// Filter out only the visible attractions
		const start = currentIndex
		const end = currentIndex + attractionsPerPage
		setVisiblePlaces(locations.places.slice(start, end))
	}, [locations.places, currentIndex])

	const handleNext = () => {
		setCurrentIndex(currentIndex + 1)
	}

	const handlePrev = () => {
		setCurrentIndex(currentIndex - 1)
	}

	return (
		<div className={styles.wrapper}>
			<Header />
			<div className={styles.background} style={{ backgroundImage: `url(${background1})` }}>
				<p>Unleash Your Inner Adventurer with Our Exciting Journey Packages</p>
				<Input value={city} onChange={e => setCity(e.target.value)} />
				<h2>Random Places</h2>
			</div>
			<main className={styles.main}>
				<div className={styles.placesContainer}>
					{visiblePlaces.length > 0 ? (
						visiblePlaces.map((place, index) => (
							<div
								key={index}
								className={`${styles.place} ${
									index === 1 ? styles.largePlace : ''
								}`}
							>
								{place.preview ? (
									<img
										src={place.preview}
										alt={place.name}
										className={styles.placeImage}
									/>
								) : (
									<img
										src={placeholderImage}
										alt='Placeholder'
										className={styles.placeImage}
									/>
								)}
								<h2>{place.name}</h2>
								<h2>{place.address.country}</h2>
								<p>Address: {place.address.road || 'No address'}</p>
								<button
									className={styles.mapButton}
									onClick={() => openGoogleMaps(place)}
								>
									<ImMap2 />
								</button>
								<Link
									to={`/chat/${place.xid}`}
									state={{ attraction: place }}
									className={styles.buttonChat}
									type='submit'
								>
									Go to chat
									<ImArrowRight2 />
								</Link>
							</div>
						))
					) : (
						<MyLoader />
					)}
				</div>
				{randomPlacesLoaded && (
					<div className={styles.carouselButtons}>
						<button
							className={styles.carouselButtonPrev}
							onClick={handlePrev}
							disabled={currentIndex === 0}
						>
							<ImArrowRight2 />
						</button>
						<button
							className={styles.carouselButtonNext}
							onClick={handleNext}
							disabled={
								currentIndex + attractionsPerPage >= locations.places.length
							}
						>
							<ImArrowRight2 />
						</button>
					</div>
				)}
			</main>
			<div className={styles.whitespace}></div>
		</div>
	)
}
