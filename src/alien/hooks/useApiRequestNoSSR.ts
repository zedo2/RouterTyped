import { TApiInstance, TApiInstanceKeys } from "../../api";
import { GetByDotKey, getByDotKey, runFnWithTuple } from "../utility/objects";
import useApi from "./useApi";
import { useState, useEffect } from 'react'
import { TApiRequest } from "./useApiRequest/types";

function useApiRequestNoSSR<T extends TApiInstanceKeys>(
	schema: T, 
	...params: Parameters<GetByDotKey<TApiInstance, T>>
){
	const api = useApi();
	const fn = getByDotKey(api, schema);
	type Res = Awaited<ReturnType<typeof fn>>;

	const initial: TApiRequest<Res> = { done: false, success: false, data: null, error: null };

	const [ result, setResult ] = useState<TApiRequest<Res>>(initial);

	useEffect(() => {
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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return result;
}

export default useApiRequestNoSSR;