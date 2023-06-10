import React, { useEffect, useState } from 'react'
import { Navbar } from './Navbar/Navbar'
import styles from './Header.module.scss'
import { Link } from 'react-router-dom'

export const Header = () => {
	const [showElement, setShowElement] = useState(false)

	useEffect(() => {
		function handleScroll() {
			if (window.scrollY > 10) {
				setShowElement(true)
			} else {
				setShowElement(false)
			}
		}

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])
	return (
		<>
				<div className={`${styles.wrapper} ${showElement ? styles.backWrapper : ''}`}>
					<div className={styles.logo}>
						<Link to='/'>
							<img src='src/assets/images/logo.svg' width='35px' alt='logo' />
							<h3>Travel app</h3>
						</Link>
					</div>
					<Navbar />
				</div>
		</>
	)
}
