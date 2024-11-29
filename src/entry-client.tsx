import ReactDOM from 'react-dom/client'
import createApp from './app'
import { BrowserRouter } from 'react-router-dom';
import { hydrateRoot } from 'react-dom/client'

(async function(){
	try{	
		const { app } = await createApp();
		const el = document.getElementById('root')!;
		const clientApp = <BrowserRouter>{ app }</BrowserRouter>;
	
		if('ssrData' in window){
			hydrateRoot(el, clientApp);
		}
		else{
			ReactDOM.createRoot(el).render(clientApp);
		}
	}
	catch(e){
		document.body.innerHTML = `<div>Site cant work now!</div>`;
	}
})();

import 'bootstrap/dist/css/bootstrap.min.css'
