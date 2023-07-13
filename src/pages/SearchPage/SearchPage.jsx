import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Header } from '../../components/Header/Header'
import { fetchMoreLocations } from '../../store/locations/locations.slice'
import styles from './SearchPage.module.scss'
import placeholderImage from '../../assets/images/no-image.jpg'
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'
import { ImArrowRight2 } from 'react-icons/im'
import MyLoader from './MyLoader'

const SearchPage = () => {
	const dispatch = useDispatch()
	const { cityName, places, offset, isLoading } = useSelector(
		({ locations }) => locations
	)

	const [favorites, setFavorites] = useState([])
	const [isFirstLoad, setIsFirstLoad] = useState(true)

	const handleShowMore = () => {
		dispatch(fetchMoreLocations({ cityName, offset }))
		setIsFirstLoad(false)
	}

	const handleFavorite = index => {
		const updatedFavorites = [...favorites]
		updatedFavorites[index] = !updatedFavorites[index]
		setFavorites(updatedFavorites)
	}

	return (
		<div className={styles.searchPage}>
			<Header className={styles.header} />
			<div className={styles.background} />
			<h1>Search Results for {cityName}</h1>
			{isFirstLoad && isLoading && <MyLoader />}
			{places.length > 0 ? (
				<>
					<div className={styles.placesContainer}>
						{places.map((place, index) => (
							<div key={place.xid} className={styles.place}>
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
								<p>Address: {place.address.road || 'No address'}</p>
								<button
									className={styles.favButton}
									onClick={() => handleFavorite(index)}
								>
									{favorites[index] ? <MdFavorite /> : <MdFavoriteBorder />}
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
						))}
					</div>
					{isLoading && <MyLoader />}
					<div className={styles.buttonContainer}>
						<Link to='/' className={styles.goBackLink}>
							Go Back
						</Link>
						{places.length < 10 ? (
							<p>No more places to show.</p>
						) : (
							<a onClick={handleShowMore} className={styles.showMoreButton}>
								Show More
							</a>
						)}
					</div>
				</>
			) : (
				<>
					{isLoading ? <MyLoader /> : null}
					{!isLoading && (
						<div className={styles.centerText}>
							<p>No places found.</p>
							<Link to='/' className={styles.goBackLink}>
								Go Back
							</Link>
						</div>
					)}
				</>
			)}
		</div>
	)
}

export default SearchPage
