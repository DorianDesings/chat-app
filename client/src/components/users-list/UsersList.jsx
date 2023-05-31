import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth.context';
import { StyledList } from './styles';

const UsersList = () => {
	const { allUsers } = useContext(AuthContext);

	return (
		<>
			<StyledList>
				{allUsers.map(user => (
					<p key={user.socketId}>{user.username}</p>
				))}
			</StyledList>
		</>
	);
};

export default UsersList;
