import { renderToString } from 'react-dom/server'
import express from 'express'
import { readFileSync } from 'fs'
import { createServer as createViteServer } from 'vite'

const app = express();

const vite = await createViteServer({
	server: { middlewareMode: true },
	appType: 'custom'
})

app.use(vite.middlewares)

app.use('*', async function(req, resp, next){
	const url = req.originalUrl;

	try{
		const indexHtml = readFileSync('./index.html').toString('utf-8');
		const template = await vite.transformIndexHtml(url, indexHtml);
		const context = { url };
		const createApp = (await vite.ssrLoadModule('./src/entry-server.tsx')).default;

		const { app, store, cache } = await createApp(context);
		const html = await recourciveRender(app, cache);

		if(store.page.status >= 300 && store.page.status <= 308){
			resp.redirect(store.page.status, store.page.redirectTo);
		}
		else{
			resp.status(store.page.status);

			const ssrData = {
				store: store.toJson(),
				cache: cache.data
			};

			const page = template
				.replace('<!--ssr-->', html)
				.replace('<!--ssr-title-->', store.page.title)
				.replace('<!--ssr-data-->', `<script>window.ssrData = ${JSON.stringify(ssrData)}</script>`)
			
			resp.end(page);
		}
	}
	catch(e){
		vite.ssrFixStacktrace(e);
		next(e);
	}
});

app.listen(5173);

async function recourciveRender(app, cache){
	const html = renderToString(app);
	const promises = Object.entries(cache.awaiting).map(([k, v]) => v.then(data => ({ k, data })));

	if(promises.length > 0){
		const data = await Promise.all(promises);
		cache.awaiting = {};
		data.forEach(entry => {
			cache.data[entry.k] = entry.data;
		});

		return recourciveRender(app, cache);
	}

	return html;	
}

