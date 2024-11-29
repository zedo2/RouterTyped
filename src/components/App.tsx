import { useRoutes } from "react-router-dom";
import { routesNative } from "../router";
import AppLink from "../alien/router/AppLink";
import { observer } from "mobx-react";
import useStore from "../alien/hooks/useStore";

const App = observer(function (){
	const view = useRoutes(routesNative);
	const { auth: { user } } = useStore();
	
	return <div className="container mt-2">
		<div className="row">
			<div className="col"><h1>Hello React!</h1></div>
			<div className="col">
				{ !user && <AppLink to="login">Login</AppLink> }
				{ user && <strong>{ user.email }</strong> }
			</div>
		</div>
		<hr/>
		{ view }
	</div>
})

export default App;