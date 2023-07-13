import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import placeholderImage from '../../assets/images/no-image.jpg'
import styles from './ChatPage.module.scss'
import { Header } from '../../components/Header/Header'

const ChatPage = () => {
	const location = useLocation()
	const attraction = location.state?.attraction
	const [inputMessage, setInputMessage] = useState('')
	const [chatHistory, setChatHistory] = useState([])
	const navigate = useNavigate()

	const sendChatRequest = async message => {
		if (!attraction) {
			setChatHistory(prevChatHistory => [
				...prevChatHistory,
				'Please ask questions related to the attraction.'
			])
			return
		}

		const fullMessage = `About ${attraction.name}: ${message}`

		const options = {
			method: 'POST',
			url: 'https://chatgpt-chatgpt3-5-chatgpt4.p.rapidapi.com/v1/chat/completions',
			headers: {
				'content-type': 'application/json',
				'X-RapidAPI-Key': '24b86b7f95mshaa5acc4b3b06b2ep1ebbc5jsn118fa73c7395',
				'X-RapidAPI-Host': 'chatgpt-chatgpt3-5-chatgpt4.p.rapidapi.com'
			},
			data: {
				model: 'gpt-3.5-turbo',
				messages: [
					...chatHistory.map(message => ({ role: 'system', content: message })), // Добавляем предыдущие сообщения в историю
					{ role: 'user', content: fullMessage } // Добавляем новое сообщение пользователя
				],
				temperature: 0.8
			}
		}

		try {
			const response = await axios.request(options)
			const chatResponse = response.data.choices[0].message.content
			setChatHistory(prevChatHistory => [
				...prevChatHistory,
				fullMessage, // Сохраняем новое сообщение пользователя
				chatResponse // Сохраняем ответ бота
			])
		} catch (error) {
			console.error(error)
		}
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
			</div>
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
						Send
					</button>
				</div>
			</div>
					<div className={styles.chatHeader}>
						<button className={styles.backButton} onClick={() => navigate(-1)}>
							Go Back
						</button>
					</div>
		</div>
	)
}

export default ChatPage
