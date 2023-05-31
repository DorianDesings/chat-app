import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/Auth.context';

const Login = () => {
	const { username, setUsername } = useContext(AuthContext);

	console.log('login', username);

	if (username) return <Navigate to='/' />;

	return (
		<>
			<form onSubmit={e => handleSubmit(e, setUsername)}>
				<label htmlFor='username'>Type your username</label>
				<input type='text' name='username' id='username' />
			</form>
		</>
	);
};

const handleSubmit = (e, setUsername) => {
	e.preventDefault();
	const newUsername = e.target.username.value;
	setUsername(newUsername);
};

export default Login;
