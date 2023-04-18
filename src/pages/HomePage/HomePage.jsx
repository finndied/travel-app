import React from 'react'
import { Header } from '../../components/Header/Header'
import styles from './HomePage.module.scss'
export const HomePage = () => {
	return (
		<div className={styles.wrapper}>
			<Header />
			<div className={styles.background}>
				<img src='/src/assets/images/background.jpg' width='100%' alt='' />
			</div>
			<div className={styles.main}>212131</div>
		</div>
	)
}
