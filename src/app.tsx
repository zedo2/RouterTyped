import App from './components/App.js'
import RootStore from './store/index.js';
import storeContext from './alien/contexts/store.js';
import apiContext from './alien/contexts/api.js';
import createHttpPlugin from './plugins/http.js'
import createApi from './api/index.js';
import cacheContext, { Cache } from './alien/contexts/cache.js';

async function createApp(){
	const http = createHttpPlugin('http://localhost:3000/');
	const api = createApi(http);
	const store = new RootStore(api);

	const cache: Cache = {
		data: {},
		awaiting: {}
	};

	if(!import.meta.env.SSR){
		http.interceptors.request.use(config => {
			const token = localStorage.getItem('AUTH_TOKEN');
	
			if(token !== null){
				config.headers.Authorization = `Bearer ${token}`;
			}
	
			return config;
		});
		
		http.interceptors.response.use(r => r, e => {
			if(e.response?.status === 401){
				document.location = '/auth/login';
			}
			else{
				return Promise.reject(e);
			}
		});

		http.interceptors.response.use(r => r, e => {
			if('errorAlert' in e.config){
				console.log('push error to alerts store or some lib like react-toast')
			}
			
			return Promise.reject(e);
		});
		
		store.auth.init();
	}

	if(!import.meta.env.SSR && window.ssrData){
		store.fromJson(window.ssrData.store);
		cache.data = window.ssrData.cache;
	}
	else{
		await store.users.load();
	}

	const app = 
		<cacheContext.Provider value={cache}>
			<apiContext.Provider value={api}>
				<storeContext.Provider value={store}>
					<App />
				</storeContext.Provider>
			</apiContext.Provider>
		</cacheContext.Provider>;
	
	return { app, store, api, cache };
}

export default createApp;