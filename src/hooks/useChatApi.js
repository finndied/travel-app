import { useState } from 'react'
import axios from 'axios'

const useChatApi = attraction => {
	// State for input message and chat history
	const [inputMessage, setInputMessage] = useState('')
	const [chatHistory, setChatHistory] = useState([])

	// Function to send a chat request to the API
	const sendChatRequest = async message => {
		if (!attraction) {
			// If attraction data is not available, show a message in the chat
			setChatHistory(prevChatHistory => [
				...prevChatHistory,
				'Please ask questions related to the attraction.'
			])
			return
		}

		// Combine user's message with the attraction's name
		const fullMessage = `About ${attraction.name}: ${message}`

		// API request options
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
					...chatHistory.map(message => ({ role: 'system', content: message })),
					{ role: 'user', content: fullMessage }
				],
				temperature: 0.8
			}
		}

		try {
			const response = await axios.request(options)
			const chatResponse = response.data.choices[0].message.content
			 // Update the chat history with the user's message and the API response
			setChatHistory(prevChatHistory => [
				...prevChatHistory,
				fullMessage,
				chatResponse
			])
		} catch (error) {
			console.error(error)
		}
	}
	return {
		inputMessage,
		setInputMessage,
		chatHistory,
		sendChatRequest
	}
}

export default useChatApi
