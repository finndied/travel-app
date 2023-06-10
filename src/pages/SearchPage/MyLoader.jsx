import React from 'react'
import ContentLoader from 'react-content-loader'

const MyLoader = props => (
	<ContentLoader
		speed={2}
		width={2000}
		height={503}
		viewBox='0 0 2000 503'
		backgroundColor='#787878'
		foregroundColor='#1C0A24'
		{...props}
	>
		<rect x='1170' y='8' rx='0' ry='0' width='277' height='218' />
		<rect x='1170' y='245' rx='0' ry='0' width='277' height='36' />
		<rect x='1170' y='292' rx='0' ry='0' width='277' height='36' />
		<rect x='1170' y='361' rx='0' ry='0' width='168' height='57' />
		<rect x='1390' y='369' rx='0' ry='0' width='51' height='48' />

		<rect x='830' y='8' rx='0' ry='0' width='277' height='218' />
		<rect x='830' y='245' rx='0' ry='0' width='277' height='36' />
		<rect x='830' y='292' rx='0' ry='0' width='277' height='36' />
		<rect x='830' y='361' rx='0' ry='0' width='168' height='57' />
		<rect x='1050' y='369' rx='0' ry='0' width='51' height='48' />

		<rect x='490' y='9' rx='0' ry='0' width='277' height='218' />
		<rect x='490' y='246' rx='0' ry='0' width='277' height='36' />
		<rect x='490' y='293' rx='0' ry='0' width='277' height='36' />
		<rect x='490' y='362' rx='0' ry='0' width='168' height='57' />
		<rect x='710' y='370' rx='0' ry='0' width='51' height='48' />
		
      <rect x='150' y='9' rx='0' ry='0' width='277' height='218' />
		<rect x='150' y='246' rx='0' ry='0' width='277' height='36' />
		<rect x='150' y='293' rx='0' ry='0' width='277' height='36' />
		<rect x='150' y='362' rx='0' ry='0' width='168' height='57' />
		<rect x='370' y='370' rx='0' ry='0' width='51' height='48' />
	</ContentLoader>
)

export default MyLoader
