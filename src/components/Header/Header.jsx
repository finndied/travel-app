import React, { useEffect, useState } from 'react'
import { Navbar } from './Navbar/Navbar'
import styles from './Header.module.scss'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.svg';
export const Header = ({ className }) => {
	const [showElement, setShowElement] = useState(false)

	useEffect(() => {
		// Function to handle the scroll event
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
				<div className={`${styles.wrapper} ${className} ${showElement ? styles.backWrapper : ''}`}>
					<div className={styles.logo}>
						<Link to='/'>
							<img src={logo} className={styles.logotype} alt="Travel app logo" />
							<h3>Travel app</h3>
						</Link>
					</div>
					<Navbar />
				</div>
		</>
	)
}
