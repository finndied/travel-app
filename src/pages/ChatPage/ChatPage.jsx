import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import placeholderImage from '../../assets/images/no-image.jpg'
import styles from './ChatPage.module.scss'
import { Header } from '../../components/Header/Header'
import useChatApi from '../../hooks/useChatApi'

const ChatPage = () => {
	const location = useLocation()
	const attraction = location.state?.attraction

	// Use the 'useChatApi' custom hook to handle chat functionality
	const { inputMessage, setInputMessage, chatHistory, sendChatRequest } =
		useChatApi(attraction)

	const handleGoBack = () => {
		window.history.back()
	}
	const handleInputChange = e => {
		setInputMessage(e.target.value)
	}

	const handleSendMessage = () => {
		sendChatRequest(inputMessage)
		setInputMessage('')
	}

	if (!attraction) {
		return <div>No attraction data available.</div>
	}

	return (
		<div className={styles.chatPage}>
			<Header className={styles.header} />
			<div className={styles.background} />
			<div className={styles.placesContainer}>
				<div className={styles.place}>
					<h2>{attraction.name}</h2>
					<p>Address: {attraction.address?.road || 'No address'}</p>
					{attraction.preview ? (
						<img
							src={attraction.preview}
							alt={attraction.name}
							className={styles.attractionImage}
						/>
					) : (
						<img
							src={placeholderImage}
							alt='Placeholder'
							className={styles.attractionImage}
						/>
					)}
					<h1>Ask the bot something about this place</h1>
				</div>
				{/* Chat container */}
				<div className={styles.chat}>
					{chatHistory.map((message, index) => (
						<div className={styles.chatAnswer} key={index}>
							{message}
						</div>
					))}
					<div className={styles.chatInputWrapper}>
						<input
							className={styles.chatInput}
							placeholder='Ask the bot'
							type='text'
							value={inputMessage}
							onChange={handleInputChange}
						/>
						<button className={styles.chatButton} onClick={handleSendMessage}>
							➤
						</button>
					</div>
					<div className={styles.chatHeader}>
						<button className={styles.backButton} onClick={handleGoBack}>
							Go Back
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ChatPage
