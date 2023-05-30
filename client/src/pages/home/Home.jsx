import { useEffect, useState } from 'react';
import socket from '../../sockets/socket';
import { StyledMessagesContainer } from './styles';

const Home = () => {
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		socket.on('server-message', data => {
			console.log(data);
			setMessages(prevMessages => [...prevMessages, data]);
		});
	}, []);

	return (
		<>
			<StyledMessagesContainer>
				{messages.length === 0 && <p>No messages</p>}
				{messages.map(item => (
					<p key={item.id}>{item.message}</p>
				))}
			</StyledMessagesContainer>
			<form onSubmit={e => handleSubmitMessage(e, socket)}>
				<input name='message' type='text' />
				<input type='submit' />
			</form>
		</>
	);
};

const handleSubmitMessage = (e, socket) => {
	e.preventDefault();
	const newMessage = {
		message: e.target.message.value
	};
	socket.emit('client-message', newMessage);
	e.target.reset();
};

export default Home;
