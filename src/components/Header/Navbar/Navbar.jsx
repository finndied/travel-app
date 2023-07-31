import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.scss'

export const Navbar = () => {
	return (
		<div className={styles.wrapper}>
         <Link to='/favorites'>
				<p>Favorites</p>
			</Link>
		</div>
	)
}
