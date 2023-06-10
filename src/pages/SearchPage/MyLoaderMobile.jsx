import React from 'react'
import ContentLoader from 'react-content-loader'
import { isMobile } from 'react-device-detect'

const MyLoaderMobile = props => (
	<ContentLoader
		speed={2}
		width={ 370}
		height={800}
		viewBox='0 0 450 900'
		backgroundColor='#787878'
		foregroundColor='#2e184e'
		{...props}
	>
		<rect x='95' y='92' rx='0' ry='0' width='305' height='201' />
		<rect x='95' y='307' rx='0' ry='0' width='305' height='32' />
		<rect x='95' y='356' rx='0' ry='0' width='305' height='32' />
		<rect x='95' y='415' rx='0' ry='0' width='200' height='40' />
		<rect x='353' y='415' rx='0' ry='0' width='44' height='40' />
	</ContentLoader>
)

export default MyLoaderMobile
