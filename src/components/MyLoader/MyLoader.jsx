import React from 'react'
import styles from './MyLoader.module.scss'
import ContentLoader from 'react-content-loader'

const MyLoader = (props) => {
	return <div className={styles.loaderContainer}>
		
<div className={styles.loader}><ContentLoader
		speed={2}
		width={250}
		height={503}
		viewBox='0 0 250 503'
		backgroundColor='#787878'
		foregroundColor='#1C0A24'
		{...props}
	>
      <rect x='0' y='9' rx='0' ry='0' width='245' height='180' />
		<rect x='0' y='206' rx='0' ry='0' width='245' height='25' />
		<rect x='0' y='253' rx='0' ry='0' width='245' height='25' />
		<rect x='0' y='300' rx='0' ry='0' width='168' height='30' />
		<rect x='193' y='300' rx='0' ry='0' width='51' height='30' />
	</ContentLoader></div>
<div className={styles.loader}><ContentLoader
		speed={2}
		width={250}
		height={503}
		viewBox='0 0 250 503'
		backgroundColor='#787878'
		foregroundColor='#1C0A24'
		{...props}
	>
      <rect x='0' y='9' rx='0' ry='0' width='245' height='180' />
		<rect x='0' y='206' rx='0' ry='0' width='245' height='25' />
		<rect x='0' y='253' rx='0' ry='0' width='245' height='25' />
		<rect x='0' y='300' rx='0' ry='0' width='168' height='30' />
		<rect x='193' y='300' rx='0' ry='0' width='51' height='30' />
	</ContentLoader></div>
		<div className={styles.loader}>
		<ContentLoader
		speed={2}
		width={250}
		height={503}
		viewBox='0 0 250 503'
		backgroundColor='#787878'
		foregroundColor='#1C0A24'
		{...props}
	>
      <rect x='0' y='9' rx='0' ry='0' width='245' height='180' />
		<rect x='0' y='206' rx='0' ry='0' width='245' height='25' />
		<rect x='0' y='253' rx='0' ry='0' width='245' height='25' />
		<rect x='0' y='300' rx='0' ry='0' width='168' height='30' />
		<rect x='193' y='300' rx='0' ry='0' width='51' height='30' />
	</ContentLoader>
		</div>
	</div>
}

export default MyLoader
