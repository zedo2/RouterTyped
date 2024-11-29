import { TUserPrimary } from "../../../types/data";
import useApiRequest from "../../../alien/hooks/useApiRequest";/* 
import useApiRequestNoSSR from "../../../alien/hooks/useApiRequestNoSSr"; */

interface UserCardProps{
	user: TUserPrimary
}

function UserTodos({ user }: UserCardProps){
	const { success, data: todos } = useApiRequest('users.todos.all', user.id);

	return <div>
		<h2>User todos</h2>
		{ success && <ul className="list-group">
			{ todos.map(todo => <li className="list-group-item" key={todo.id}>{ todo.title }</li>) }
		</ul> }
	</div>
}

export default UserTodos;