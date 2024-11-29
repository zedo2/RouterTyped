import { observer } from "mobx-react";
import useApiRequest from "../../../alien/hooks/useApiRequest";
import useUserOutletContext from "../outlet/useUserOutlet";
import useStore from "../../../alien/hooks/useStore";
import Navigate from "../../../alien/router/Navigate";
import { useEffect, useState } from 'react'

const UserTodosPage = observer(() => {
	const user = useUserOutletContext();
	const { success, data: todos, error } = useApiRequest('users.todos.all', user.id);
	const { auth: { user: authUser, ready } } = useStore();
	const [ a, setA ] = useState(false)

	useEffect(() => {
		ready.then(() => setA(true));
	}, [ ready ]);

	return <>{ a &&
		<>
		{ authUser && <div>
			<h2>User todos</h2>
			{ success && <ul className="list-group">
				{ todos.map(todo => <li className="list-group-item" key={todo.id}>{ todo.title }</li>) }
			</ul> }
			{ error && <div className="text-danger">Some error, not loaded</div>  }
		</div> }
		{ !authUser && <Navigate to="/auth/login" /> } </>}
	</>
});

export default UserTodosPage;