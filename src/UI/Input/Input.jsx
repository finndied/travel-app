import React from 'react'
import styles from './Input.module.scss'

export const Input = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.inputWrapper}>
				<input
					type='text'
					className={styles.input}
					placeholder='Where are you looking for?'
				/>
				<button className={styles.button}>Explore</button>
			</div>
		</div>
	)
}
