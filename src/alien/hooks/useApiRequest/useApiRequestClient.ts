import { TApiInstance, TApiInstanceKeys } from "../../../api";
import { GetByDotKey, getByDotKey, runFnWithTuple } from "../../utility/objects";
import useApi from "../useApi";
import { useState, useEffect } from 'react'
import { TApiRequest } from "./types";
import useCache from "../useCache";

function useApiRequestClient<T extends TApiInstanceKeys>(
	schema: T, 
	...params: Parameters<GetByDotKey<TApiInstance, T>>
){
	const api = useApi();
	const fn = getByDotKey(api, schema);
	const cache = useCache();

	type Res = Awaited<ReturnType<typeof fn>>;

	const key = schema + ':' + JSON.stringify(params);
	
	const initial: TApiRequest<Res> = key in cache.data ? {
		done: true,
		success: true,
		data: cache.data[key] as Res,
		error: null
	} : { done: false, success: false, data: null, error: null };

	const [ result, setResult ] = useState<TApiRequest<Res>>(initial);

	useEffect(() => {
		if(!result.done){
			runFnWithTuple(fn, params)
				.then(data => setResult({
					done: true,
					success: true,
					data: data as Res,
					error: null
				}))
				.catch((e: Error) => setResult({
					done: true,
					success: false,
					data: null,
					error: e
				}))
		}
		else{
			//delete cache.data[key];
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return result;
}

export default useApiRequestClient;