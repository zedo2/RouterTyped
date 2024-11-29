import { Link } from "react-router-dom";
import { TUserNeighbours, TUserPrimary } from "../../types/data";
import useApiRequest from "../../alien/hooks/useApiRequest";
import AppLink from "../../alien/router/AppLink";
import UserOutlet from "../../pages/users/outlet/UserOutlet";

interface UserDetailedProps{
	user: TUserPrimary,
	neighbours: TUserNeighbours
}

function UserDetailed({ user, neighbours }: UserDetailedProps){
	const { success, data } = useApiRequest('users.one', user.id);

	return <div>
		<AppLink to="home">Home</AppLink> / 
		<span>{ user.username }</span>
		<hr/>
		{ success && 
			<>
				<div>
					{ data.phone }
					{ data.company.name }
					{ data.website }
				</div>
				<hr/>
				<AppLink to="user.todos" params={[ user.id ]}>Todos</AppLink>
				<AppLink to="user.hi" params={[ user.id ]}>Sample</AppLink>
				<hr/>
				<UserOutlet context={data} />
			</>
		}
		<hr/>
		{ neighbours.prev && <Link to={`/user/${neighbours.prev.id}`}>Prev user</Link> }
		{ neighbours.next && <Link to={`/user/${neighbours.next.id}`}>Next user</Link> }
	</div>
}

export default UserDetailed;