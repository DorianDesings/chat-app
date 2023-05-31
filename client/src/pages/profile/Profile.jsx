import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/Auth.context';

const Profile = () => {
	const { username, setUsername } = useContext(AuthContext);

	if (!username) return <Navigate to='/' />;
	return (
		<>
			<h1>{username}</h1>
			<button onClick={() => handleLogout(setUsername)}>Sign Out</button>
		</>
	);
};

const handleLogout = setUsername => {
	setUsername(null);
	localStorage.setItem('username', '');
};

export default Profile;
