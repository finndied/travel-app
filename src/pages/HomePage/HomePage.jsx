import { Header } from '../../components/Header/Header'
import styles from './HomePage.module.scss'
import { Input } from '../../UI/Input/Input'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'


export const HomePage = () => {
	const locations = useSelector(state => state.locations)

	const [city, setCity] = useState('')


	useEffect(() => {
		if (city) {

		}
	}, [])

	return (
		<div className={styles.wrapper}>
			<Header />
			<div className={styles.background}>
				<p>Unleash Your Inner Adventurer with Our Exciting Journey Packages</p>
					<Input value={city} onChange={e => setCity(e.target.value)} />
				<h2>Popular Places</h2>
			</div>
			<main className={styles.main}>
				<div>
					{locations.data?.data ? (
						locations.data.data.map((place, index) => (
							<div key={index}>{place.name}</div>
						))
					) : (
						<div>No results found</div>
					)}
				</div>
				<div></div>
			</main>
		</div>
	)
}
