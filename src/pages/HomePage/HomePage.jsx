import React from 'react'
import { Header } from '../../components/Header/Header'
import styles from './HomePage.module.scss'
import { Input } from '../../UI/Input/Input'
export const HomePage = () => {
	return (
		<div className={styles.wrapper}>
			<Header />
			<div className={styles.background}>
				<img src='/src/assets/images/background.jpg' width='100%' alt='' />
                        <Input/>
			</div>
			<main className={styles.main}></main>
		</div>
	)
}
