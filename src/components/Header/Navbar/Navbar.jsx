import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.scss'

export const Navbar = () => {
	return (
		<div className={styles.wrapper}>
			<Link to='#'>
				<p>Tutorial</p>
			</Link>
         <Link to='#'>
				<p>Chat</p>
			</Link>
		</div>
	)
}
