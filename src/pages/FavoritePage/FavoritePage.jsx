import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromFavorites } from '../../store/favorites/favorites.slice'
import placeholderImage from '../../assets/images/no-image.jpg'
import styles from './FavoritePage.module.scss'
import { Header } from '../../components/Header/Header'
import { MdFavorite } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { ImArrowRight2, ImMap2 } from 'react-icons/im'

const FavoritePage = () => {
	const dispatch = useDispatch()
	const { favorites } = useSelector(({ favorites }) => favorites)

	const handleRemoveFavorite = xid => {
		dispatch(removeFromFavorites({ xid }))
	}

	const openGoogleMaps = place => {
		const attractionName = place.name
		const url = `https://www.google.com/maps?q=${encodeURIComponent(
			attractionName
		)}`
		window.open(url, '_blank')
	}

	const handleGoBack = () => {
		window.history.back()
	}

	return (
		<div className={styles.favoritePage}>
			<Header className={styles.header} />
			<div className={styles.background} />
			<h1 className={styles.title}>Favorite Places</h1>
			{favorites.length > 0 ? (
				<div className={styles.placesContainer}>
					{favorites.map(place => (
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
							<Link
								to={`/chat/${place.xid}`}
								state={{ attraction: place }}
								className={styles.buttonChat}
							>
								Go to chat
								<ImArrowRight2 />
							</Link>
							<button
								className={styles.mapButton}
								onClick={() => openGoogleMaps(place)}
							>
								<ImMap2 />
							</button>
							<button
								onClick={() => handleRemoveFavorite(place.xid)}
								className={styles.removeButton}
							>
								<MdFavorite />
							</button>
						</div>
					))}
				</div>
			) : (
				<p className={styles.noPlaces}>No favorite places yet.</p>
			)}
			<div className={styles.buttonContainer}>
				<button onClick={handleGoBack} className={styles.goBackLink}>
					Go Back
				</button>
			</div>
		</div>
	)
}

export default FavoritePage
