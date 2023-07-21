import { useState } from 'react'
import axios from 'axios'

const useChatApi = attraction => {
	const [inputMessage, setInputMessage] = useState('')
	const [chatHistory, setChatHistory] = useState([])

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
					...chatHistory.map(message => ({ role: 'system', content: message })),
					{ role: 'user', content: fullMessage }
				],
				temperature: 0.8
			}
		}

		try {
			const response = await axios.request(options)
			const chatResponse = response.data.choices[0].message.content
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
