import { useState } from "react";
import useApi from "../../alien/hooks/useApi";

function LoginPage(){
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ errors, setErrors ] = useState<string[]>([]);
	const { auth } = useApi();

	async function tryAuth(){
		try{
			setErrors([]);
			const response = await auth.login(email, password);

			if(response.success){
				localStorage.setItem('AUTH_TOKEN', response.token);
				document.location = '/';
			}
			else{
				setErrors(response.errors);
			}
		}
		catch(e){
			setErrors(['some server error']);
		}
	}

	return <form>
		<div className="form-group">
			<label>Email address</label>
			<input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
		</div>
		<div className="form-group">
			<label>Password</label>
			<input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
		</div>
		<button type="button" className="btn btn-primary mt-3" onClick={tryAuth}>Try auth</button>
		<div className="text-danger mt-3">
			{ errors.map((err, i) => <p key={i}>{err}</p>) }
		</div>
	</form>
}

export default LoginPage;