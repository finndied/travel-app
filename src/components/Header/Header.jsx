import React from 'react'
import { Navbar } from './Navbar/Navbar'
import styles from './Header.module.scss'
import { Link } from 'react-router-dom'

export const Header = () => {
	return (
		<>
			<div className={styles.wrapper}>
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
