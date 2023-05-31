import { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import UsersList from '../../components/users-list/UsersList';
import { AuthContext } from '../../contexts/Auth.context';
import socket from '../../sockets/socket';
import { StyledChat, StyledMessagesContainer } from './styles';

const Home = () => {
	const [messages, setMessages] = useState([]);
	const { username } = useContext(AuthContext);

	const navigate = useNavigate();

	useEffect(() => {
		socket.on('server-message', data => {
			console.log(data);
			setMessages(prevMessages => [...prevMessages, data]);
		});
	}, []);

	if (!username) return <Navigate to='/login' />;
	return (
		<>
			<StyledChat>
				<UsersList />
				<StyledMessagesContainer>
					{messages.length === 0 && <p>No messages</p>}
					{messages.map(message => (
						<p key={message.id}>
							{message.username}: {message.message}
						</p>
					))}
				</StyledMessagesContainer>
			</StyledChat>
			<form onSubmit={e => handleSubmitMessage(e, socket)}>
				<input name='message' type='text' />
				<input type='submit' />
			</form>

			<button onClick={() => navigate('/profile')}>See Profile</button>
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
