import { useEffect, useState } from 'react';
import { AuthContext } from '../contexts/Auth.context';
import socket from '../sockets/socket';

export const AuthProvider = ({ children }) => {
	const [username, setUsername] = useState(getUsernameFromLocalStorage);
	const [allUsers, setAllUsers] = useState([]);

	useEffect(() => {
		if (!username) return;
		socket.emit('set-username', username);
		localStorage.setItem('username', username);
		socket.on('users-in-chat', data => {
			console.log('USERS', data);
			setAllUsers(data);
		});

		return () => {
			socket.off('users-in-chat', handleUsersInChat);
		};
	}, [username]);

	const handleUsersInChat = (data, setAllUsers) => {
		console.log('USERS', data);
		setAllUsers(data);
	};

	return (
		<AuthContext.Provider value={{ username, setUsername, allUsers }}>
			{children}
		</AuthContext.Provider>
	);
};

const getUsernameFromLocalStorage = () => {
	const storageUsername = localStorage.getItem('username');
	return storageUsername;
};
